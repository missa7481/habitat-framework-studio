/* Held-region performance. The only geographic measurements in this viewer are sector-level losses. */
(() => {
  "use strict";
  const base = new URL(".", document.currentScript?.src || document.baseURI);
  const source = "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/rsi_macro/sector_metrics.csv";
  /* begin archive data */
  const scores = {"Complementary spatial fusion":{"0":[0.1160618787350831,0.4495123915664384,0.4691020674598051,0.6208662353899355,0.7088564560580842,0.079205084293179],"24":[0.35483724833354907,0.47023774489225195,0.6495590822275047,0.3760369319951515,0.2637876930927076,0.01936262386076996]},"RSI cycle 2":{"0":[0.1160618787350831,0.46180560229414314,0.4691020674598051,0.6997355991768909,0.7088564560580842,0.079205084293179],"24":[0.35483724833354907,0.47023774489225195,0.6495590822275047,0.3760369319951515,0.2637876930927076,0.01936262386076996]},"Spatial beta-binomial":{"0":[0.12395878894726345,0.46180560229414314,0.4667220061746617,0.6221691869205398,0.6824577107932134,0.10492879568109686],"24":[0.3557777186812936,0.47498056835105196,0.6571610023783534,0.38867013184342963,0.2923870300850581,0.01484412438064911]},"Beta-binomial fused multiscale":{"0":[0.17452127095760572,0.45874321127387896,0.4634049045157587,0.6998528341976591,0.6698869706240103,0.08901414856311084],"24":[0.39621728362055886,0.4761795059924379,0.7035478004018979,0.4170658092442999,0.33636499402778985,0.026676606681898595]},"Logistic fused":{"0":[0.1738104108776045,0.4470552807189941,0.5358693272374638,0.6997355991768909,0.6712297644655674,0.0860651025861949],"24":[0.3955080728213438,0.4589981753776911,0.7076343530576131,0.41778618747237534,0.32978534589260217,0.02891122562728677]},"Forest fused":{"0":[0.2561719813065143,0.47946812273151823,0.4784487927450126,0.6791039107594189,0.7860949766867786,0.15985976910291216],"24":[0.453046484635538,0.47211891308132936,0.7192379538749529,0.4780385794659368,0.4234331727199053,0.05395380128898138]},"MaxEnt_Java_LQ":{"0":[0.05199504505441379,0.7404337498340227,0.564624438647443,0.7315261785260632,0.8238983116230003,0.22998303089882483],"24":[0.5459302002525237,0.4876491109312711,0.9933147201908787,0.4393230978380019,0.281888223269534,0.16853670247308478]}};
  /* end archive data */
  const titles = {
    "Complementary spatial fusion":"Fixed complementary spatial fusion",
    "RSI cycle 2":"Nested selection, cycle 2",
    "Spatial beta-binomial":"Spatial beta-binomial",
    "Beta-binomial fused multiscale":"Multiscale beta-binomial",
    "Logistic fused":"Logistic regression with fused inputs",
    "Forest fused":"Random forest with fused inputs",
    "MaxEnt_Java_LQ":"Java MaxEnt with physical inputs",
  };
  const candidates=Object.keys(titles).slice(0,4);
  const controls=Object.keys(titles).slice(4);
  const delta=(x)=>Math.abs(x)<1e-12?"0.000":(x<0?"−":"+")+Math.abs(x).toFixed(Math.abs(x)<.001?4:3);
  const kind=(x)=>Math.abs(x)<1e-12?"tie":x<0?"lower":"higher";
  const deg=(n)=>n===0?"0°":Math.abs(n)+"°"+(Math.abs(n)===180?"":n<0?"W":"E");

  function sectors(origin) {
    return Array.from({length:6},(_,i)=>{
      const west=-180+origin+60*i;
      const end=west+60;
      const east=end>180?end-360:end;
      const parts=end>180?[[west,180],[-180,east]]:[[west,east]];
      return {i,west,east,parts,label:deg(west)+" to "+deg(east)+(end>180?" via 180°":"")};
    });
  }

  function element(tag,cls,value){
    const e=document.createElement(tag);
    if(cls) e.className=cls;
    if(value!==undefined) e.textContent=value;
    return e;
  }
  function select(label, options, initial, parent) {
    const box=element("label"), cap=element("span","",label), shell=element("span","secmap-select"), field=element("select");
    field.setAttribute("aria-label",label);
    for(const [id,title] of options) field.add(new Option(title,id));
    field.value=initial;
    shell.append(field); box.append(cap,shell);parent.append(box);
    return field;
  }

  function style(){
    if(document.getElementById("secmap-css"))return;
    const el=element("style");el.id="secmap-css";el.textContent=`
    .secmap{margin:0;color:#263f39;font:1rem/1.5 Arial,sans-serif;min-width:0}.secmap *{box-sizing:border-box}
    .secmap .secmap-tools{display:grid;grid-template-columns:minmax(8rem,.85fr) minmax(12rem,1.3fr) minmax(12rem,1.3fr);gap:12px;padding-bottom:14px}.secmap .secmap-tools label{display:grid;gap:4px;font-size:.875rem;font-weight:bold;color:#35534b;min-width:0}
    .secmap .secmap-select{position:relative;display:block}.secmap .secmap-select:after{content:"⌄";position:absolute;right:12px;top:5px;pointer-events:none;font-size:18px;color:#31594d}
    .secmap select{font:inherit;color:#183c30;width:100%;appearance:none;border:1px solid #b9c9bf;border-radius:6px;background:#fff;padding:8px 30px 8px 10px;min-height:40px;cursor:pointer}
    .secmap .secmap-world{aspect-ratio:36/17;max-height:380px;position:relative;border:1px solid #b9cac5;isolation:isolate;border-radius:6px;overflow:hidden;background:#f7f9f7}
    .secmap .secmap-world img{width:100%;height:100%;position:absolute;inset:0;display:block;object-fit:fill;filter:grayscale(1) contrast(1.2);opacity:.70;pointer-events:none;z-index:1}
    .secmap .secmap-band{appearance:none;position:absolute;inset-block:0;z-index:2;cursor:pointer;border:0;border-inline-start:1px dashed #5e726b88;padding:0;margin:0;border-radius:0;display:grid;place-content:center;text-align:center;font:700 15px/1.2 Arial,sans-serif;color:#153628;box-shadow:none}
    .secmap .secmap-band:first-of-type{border-inline-start:0}.secmap .lower{background:rgba(42,155,126,.22)}.secmap .higher{background:rgba(208,142,65,.26)}.secmap .tie{background:rgba(137,152,148,.13)}.secmap .secmap-band:hover,.secmap .secmap-band:focus-visible,.secmap .secmap-band[aria-pressed="true"]{outline:2px solid #264e49;outline-offset:-3px;z-index:3}
    .secmap .secmap-tag{color:#153c31;background:#ffffffed;border:1px solid #a8b9b0;border-radius:4px;padding:.28em .45em;pointer-events:none}.secmap .secmap-legend{display:flex;flex-wrap:wrap;gap:5px 16px;margin:9px 0 0;font-size:.88rem}.secmap .secmap-key{display:inline-flex;align-items:center;gap:5px}.secmap .secmap-key i{width:14px;height:14px;display:inline-block;border:1px solid #697b75}
    .secmap .secmap-summary{margin:.8rem 0 0;font-weight:bold}.secmap .secmap-detail{margin:.33rem 0 .75rem;color:#435f54;min-height:1.4em}
    .secmap details{margin:.6rem 0}.secmap details summary{font-size:.92rem;cursor:pointer;color:#225f4b;font-weight:bold}.secmap .secmap-scroll{overflow-x:auto}.secmap table{border-collapse:collapse;min-width:435px;width:100%;font: .9rem/1.4 Arial,sans-serif}.secmap th,.secmap td{border:0;border-bottom:1px solid #d8e2db;text-align:right;padding:7px 6px}.secmap th:nth-child(-n+2),.secmap td:nth-child(-n+2){text-align:left}.secmap .secmap-note{font-size:.88rem;color:#536d62;margin:.6rem 0 0}.secmap .secmap-note a{white-space:nowrap}
    @media(max-width:700px){.secmap .secmap-tools{grid-template-columns:1fr 1fr}.secmap .secmap-tools label:first-child{grid-column:1/-1}.secmap .secmap-band{font-size:13px}.secmap .secmap-tag{padding:.2em .22em}.secmap .secmap-world{max-height:none}}
    @media(max-width:440px){.secmap .secmap-tools{grid-template-columns:1fr}.secmap .secmap-band{font-size:11px}.secmap .secmap-world{aspect-ratio:2/1}.secmap .secmap-legend{font-size:.8rem;gap:3px 8px}}
    `;document.head.append(el);
  }

  function renderSectorMap(container){
    if(typeof container==="string") container=document.querySelector(container);
    if(!container) throw new Error("An existing sector-map container is required.");
    style();
    const panel=element("figure","secmap");panel.setAttribute("aria-label","Model performance across six held-out sectors");
    const tools=element("div","secmap-tools");panel.append(tools);
    const part=select("Geographic partition",[["0","Primary"],["24","Shifted by 24°"]],"0",tools);
    const first=select("Candidate",candidates.map(k=>[k,titles[k]]),candidates[0],tools);
    const second=select("Comparator",controls.map(k=>[k,titles[k]]),controls[0],tools);
    const world=element("div","secmap-world"),img=element("img");
    img.src=new URL("assets/coverage-all.png",base).href;img.alt="";
    img.addEventListener("error",()=>{img.hidden=true;});world.append(img);
    const legend=element("div","secmap-legend");
    for(const [name,title] of [["lower","Candidate lower loss"],["tie","Equal loss"],["higher","Comparator lower loss"]]){
      const label=element("span","secmap-key"); const chip=element("i",name);chip.setAttribute("aria-hidden","true");label.append(chip,title);legend.append(label);
    }
    const summary=element("p","secmap-summary"),detail=element("p","secmap-detail");
    summary.setAttribute("aria-live","polite");detail.setAttribute("aria-live","polite");
    const disclosure=element("details"),switcher=element("summary","","All six sector scores"),wrap=element("div","secmap-scroll"),table=element("table");
    const head=table.createTHead().insertRow();
    for(const title of ["Sector","Longitude span","Candidate loss","Comparator loss","Difference"]){const th=element("th","",title);th.scope="col";head.append(th);}
    const body=table.createTBody();wrap.append(table);disclosure.append(switcher,wrap);
    const note=element("figcaption","secmap-note","Each band shows one retrospective held-sector score for the species mix in community reports. Negative differences favor the candidate. The silhouette shows environmental input coverage. Bands identify evaluation regions; habitat suitability and survey locations are outside this layer. ");
    const link=element("a","","Archived sector metrics");link.href=source;link.target="_blank";link.rel="noopener";note.append(link);
    panel.append(world,legend,summary,detail,disclosure,note);container.replaceChildren(panel);
    let active=0;
    function update(){
      const origin=Number(part.value),items=sectors(origin);
      const cv=scores[first.value][origin],bv=scores[second.value][origin],dx=cv.map((x,i)=>x-bv[i]);
      world.querySelectorAll("button").forEach(b=>b.remove());body.replaceChildren();
      function activate(index){
        active=index;
        world.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.sector)===active)));
        detail.textContent="Sector "+(active+1)+" · "+items[active].label+" · candidate "+cv[active].toFixed(3)+", comparator "+bv[active].toFixed(3)+", difference "+delta(dx[active])+" nats per report.";
      }
      for(const group of items){
        const i=group.i,k=kind(dx[i]);
        for(const [lo,hi] of group.parts){
          const btn=element("button","secmap-band "+k),label=element("span","secmap-tag","S"+(i+1));
          btn.type="button";btn.dataset.sector=String(i);btn.style.left=(lo+180)/3.6+"%";btn.style.width=(hi-lo)/3.6+"%";
          const name="Sector "+(i+1)+", "+group.label+", paired difference "+delta(dx[i])+" nats per report.";
          btn.setAttribute("aria-label",name);btn.title=name;btn.append(label);btn.addEventListener("click",()=>activate(i));world.append(btn);
        }
        const tr=body.insertRow();for(const txt of [String(i+1),group.label,cv[i].toFixed(3),bv[i].toFixed(3),delta(dx[i])])tr.insertCell().textContent=txt;
      }
      const wins=dx.filter(x=>kind(x)==="lower").length,ties=dx.filter(x=>kind(x)==="tie").length;
      summary.textContent="Mean paired loss difference "+delta(dx.reduce((a,b)=>a+b,0)/6)+" nats per report. Candidate lower in "+wins+" of 6 sectors"+(ties?", with "+ties+(ties===1?" tie.":" ties."):".");
      activate(active);
    }
    for(const control of [part,first,second]) control.addEventListener("change",update);
    update();
    return {destroy(){panel.remove();}};
  }
  window.renderSectorMap=renderSectorMap;
})();
