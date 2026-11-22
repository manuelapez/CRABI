"""Recreate demographic-only CRABI sensitivity outputs; no COVID/ASPB inputs."""
import csv, json, math, subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'demo/data'
OUT=ROOT/'resultados/robustez'
BANDS={'45_49':range(45,50),'50_69':range(50,70),'70_74':range(70,75)}
PLANS={'A':(.25,.35,.40),'B':(.50,.35,.15)}

def read_csv(path):
    with path.open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))

def aggregate(period,source):
    period_name={'2026-01':'1 de enero de 2026','2026-07':'1 de julio de 2026','2026-10':'1 de octubre de 2026'}[period]
    values={}
    with source.open(encoding='utf-8-sig',newline='') as f:
        for r in csv.DictReader(f):
            age=int(r.get('edad',r.get('edad_simple')))
            if r['periodo']!=period_name or age not in range(45,75):continue
            code='00' if r['territorio']=='Total Nacional' else r['territorio'][:2]
            values.setdefault(code,{})[age]=int(r.get('mujeres_residentes',r.get('mujeres')))
    assert all(set(v)==set(range(45,75)) for v in values.values())
    return {c:{b:sum(a[x] for x in ages) for b,ages in BANDS.items()} for c,a in values.items()}

def calc(pop,invite,part,follow,threshold,weights=PLANS):
    n=pop*invite;out={}
    for plan,shares in weights.items():
        ti=[n*w for w in shares];tt=[x*part for x in ti]
        out[plan]={'invited':n,'periodInvites':ti,'periodTests':tt,'periodFollowup':[x*follow for x in tt],
                   'total':sum(tt),'peak':max(tt,default=0),'above':sum(x>threshold for x in tt),'followup':n*part*follow}
    return out

def write_csv(name,rows):
    with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)

def node_reference(inputs):
    js="const m=require('./demo/model.js');let s='';process.stdin.on('data',x=>s+=x);process.stdin.on('end',()=>{const a=JSON.parse(s);process.stdout.write(JSON.stringify(a.map(x=>m.calculate(x.population,x.invitation,x.participation,x.followup,x.capacity))))})"
    p=subprocess.run(['node','-e',js],cwd=ROOT,input=json.dumps(inputs),text=True,capture_output=True,check=True)
    return json.loads(p.stdout)

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    snapshots={p:{r['code']:{b:int(r[b]) for b in BANDS} for r in read_csv(DATA/f'population_{p}.csv')} for p in ('2026-01','2026-07','2026-10')}
    for p in snapshots:
        assert snapshots[p]==aggregate(p,DATA/'ine_ecp_2026_mujeres_40_79_edad.csv')
        nat=snapshots[p]['00']
        for band in BANDS:assert sum(v[band] for c,v in snapshots[p].items() if c!='00')==nat[band]
    octn=snapshots['2026-10']['00']; rows=[]
    for code,v in snapshots['2026-10'].items():
        base=v['50_69'];expanded=sum(v[b] for b in BANDS)
        rows.append({'code':code,'age_50_69_residents':base,'age_45_74_residents':expanded,'difference_45_74_minus_50_69':expanded-base,'relative_difference_pct_vs_50_69':f'{(expanded/base*100-100):.6f}' if base else ''})
    write_csv('age_range_sensitivity.csv',rows)
    invitation=(0,.25,.5,.75,1);participation=(0,.25,.5,.6,.75,1);grid=[]
    for i in invitation:
        for p in participation:
            r=calc(octn['50_69'],i,p,.05,250000)
            grid.append({'population':'resident_female_50_69_national_oct2026','invitation_fraction':i,'participation_scenario_fraction':p,'invited_hypothetical':r['A']['invited'],'tests_expected_arithmetic':r['A']['total'],'peak_A':r['A']['peak'],'peak_B':r['B']['peak'],'followup_scenario_5pct':r['A']['followup'],'classification':'deterministic scenario; not observed rate or prediction'})
    write_csv('demographic_sensitivity_grid.csv',grid)
    weight_cases={'A_current_25_35_40':(.25,.35,.40),'B_current_50_35_15':(.5,.35,.15),'equal_33_33_34':(1/3,1/3,1/3),'front_loaded_60_30_10':(.6,.3,.1),'back_loaded_10_30_60':(.1,.3,.6)}
    base=octn['50_69']*.6;wr=[]
    for name,w in weight_cases.items():
        period=[base*x for x in w];wr.append({'distribution':name,'weights':'/'.join(f'{x:.8f}' for x in w),'total_expected_tests':sum(period),'peak_expected_tests_per_period':max(period),'relative_peak_vs_equal_pct':(max(period)/(base/3)-1)*100,'periods_over_hypothetical_250000_threshold':sum(x>250000 for x in period),'classification':'arbitrary temporal allocation; not calendar or capacity'})
    write_csv('temporal_weight_sensitivity.csv',wr)
    madrid=next(int(r['50_69']) for r in read_csv(DATA/'population_2026-10.csv') if r['code']=='13');tr=[]
    for limit in (0,100000,150000,200000,250000,300000,350000):
        r=calc(madrid,1,.6,.05,limit)
        tr.append({'territory_scenario':'Madrid 50-69 residents Oct-2026; 100% invite; 60% scenario','threshold_hypothetical_tests_per_period':limit,'plan_A_periods_above':r['A']['above'],'plan_B_periods_above':r['B']['above'],'peak_A':r['A']['peak'],'peak_B':r['B']['peak'],'classification':'mathematical threshold only; not capacity'})
    write_csv('threshold_sensitivity.csv',tr)
    temporal=[]
    for p,vals in snapshots.items():
        for b in BANDS:temporal.append({'reference_period':p,'band':b,'resident_count':vals['00'][b],'prior_snapshot_value':'','absolute_difference_vs_prior':'','relative_difference_pct_vs_prior':'','comparison':'reference-date change using current extract'})
    old=aggregate('2026-07',DATA/'ine_ecp_2026_mujeres_40_79_edad_previous.csv')
    old_snap={r['code']:{b:int(r[b]) for b in BANDS} for r in read_csv(DATA/'population_2026-07_snapshot_pre_revision.csv')}
    assert old==old_snap
    for b in BANDS:
        prev=old['00'][b];now=snapshots['2026-07']['00'][b]
        temporal.append({'reference_period':'2026-07-revision','band':b,'resident_count':now,'prior_snapshot_value':prev,'absolute_difference_vs_prior':now-prev,'relative_difference_pct_vs_prior':f'{(now/prev-1)*100:.6f}','comparison':'same reference date; archived prior extract vs current revised table'})
    write_csv('provisional_population_comparison.csv',temporal)
    cases=[{'population':octn['50_69'],'invitation':i,'participation':p,'followup':.05,'capacity':250000} for i in invitation for p in participation]
    cases += [{'population':0,'invitation':0,'participation':0,'followup':0,'capacity':0},{'population':sum(octn[b] for b in BANDS),'invitation':.37,'participation':.484,'followup':0,'capacity':300000},{'population':1,'invitation':1,'participation':1,'followup':1,'capacity':1},{'population':1000000,'invitation':.1234567,'participation':.7654321,'followup':.1111111,'capacity':12345}]
    js=node_reference(cases);checks=[];abs_tol,rel_tol=1e-8,1e-12
    def close(a,b):return abs(a-b)<=abs_tol+rel_tol*max(abs(a),abs(b))
    for i,x in enumerate(cases):
        py=calc(x['population'],x['invitation'],x['participation'],x['followup'],x['capacity'])
        for plan in ('A','B'):
            a,b=py[plan],js[i][plan]
            for k,jk in (('invited','invited'),('total','total'),('peak','peak'),('followup','followup')):
                assert close(a[k],b[jk]);checks.append({'module':'demographic','case':i,'metric':f'{plan}.{k}','python_independent':a[k],'javascript':b[jk],'absolute_difference':abs(a[k]-b[jk]),'tolerance':f'{abs_tol}+{rel_tol}*max_abs','status':'pass'})
            for k,jk in (('periodInvites','invitations'),('periodTests','tests'),('periodFollowup','followup')):
                for n,(u,v) in enumerate(zip(a[k],[z[jk] for z in b['periods']])):
                    assert close(u,v);checks.append({'module':'demographic','case':i,'metric':f'{plan}.{k}[{n}]','python_independent':u,'javascript':v,'absolute_difference':abs(u-v),'tolerance':f'{abs_tol}+{rel_tol}*max_abs','status':'pass'})
            assert a['above']==b['above'];checks.append({'module':'demographic','case':i,'metric':f'{plan}.above','python_independent':a['above'],'javascript':b['above'],'absolute_difference':0,'tolerance':'exact integer equality','status':'pass'})
    assert len(checks)==952
    write_csv('independent_demographic_engine_checks.csv',checks)
    print(json.dumps({'demographic_checks':len(checks),'failures':0,'outputs':8}))

if __name__=='__main__':main()
