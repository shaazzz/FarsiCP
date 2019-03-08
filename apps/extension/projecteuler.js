var farsiCP = "https://shaazzz.github.io/FarsiCP/";

function addButton(address,value){
    let editbtn = document.createElement('a');
    let btnList = document.getElementById('navigation');
    editbtn.href = address;
    editbtn.innerText = value;
    btnList.insertBefore(editbtn,btnList.childNodes[0]);
}

async function loadProblem(probid){
    let adr = farsiCP + 'PE/' + probid + '/statement';
    console.log(adr);
    let html="salam";
    try{
        let res = await fetch(adr);
        console.log(res.status);
        if (res.status==404){
            throw new Error('Not found');
        }
        html = await res.text();
    }catch(e){
        if (e.message=='Not found'){
            addButton('https://github.com/shaazzz/FarsiCP/new/master/PE/'+probid+'/','Tarjome');
        }    
        console.log(e);
        return;
    }
    console.log(html);
    let dom = (new DOMParser).parseFromString(html,'text/html');
    console.log(dom);
    let farsiDiv = dom.getElementById('problem-statement');
    console.log(farsiDiv);
    let englishDiv = document.getElementsByClassName('problem_content')[0];
    console.log(englishDiv);
    englishDiv.outerHTML = farsiDiv.outerHTML;
    let mathsc = document.createElement('script');
    mathsc.innerHTML = `
        console.log(MathJax);
        MathJax.Hub.Config({
           tex2jax: {
             inlineMath: [ ['$','$'] ],
             processEscapes: true
           }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "problem-statement"]);`;
    document.body.appendChild(mathsc);
    document.documentElement.scrollTop = 0;
    addButton('https://github.com/shaazzz/FarsiCP/tree/master/PE/'+probid+'/','Virayesh');
    addButton(location.pathname+'?farsi=false','English');
    document.getElementById('problem-statement').className = 'problem_content';
}

async function main(){
    var probid = "1";
    if (location.pathname.search(/\/problem=.*/)!=-1){
        probid = location.pathname.replace(/\/problem=/g,'');
    }
    else{
        return;
    }
    let urlparam = new URLSearchParams(location.search);
    if (urlparam.get('farsi')=='false'){
	    addButton(location.pathname,'Farsi');
	    return;
    }
    probid = probid.toUpperCase();
    await loadProblem(probid);
}

main();
