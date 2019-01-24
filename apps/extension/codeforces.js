var farsiCP = "https://shaazzz.github.io/FarsiCP/";

function addButton(address,value){
    let editbtn = document.createElement('li');
    let btnList = document.getElementsByClassName('second-level-menu-list')[0];
    editbtn.innerHTML = `<a href="${address}">${value}</a>`;
    btnList.appendChild(editbtn);
}

async function loadProblem(probid){
    let adr = farsiCP + 'CF/' + probid + '/statement';
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
            let editbtn = document.createElement('li');
            let btnList = document.getElementsByClassName('second-level-menu-list')[0];
            editbtn.innerHTML = '<a href="https://github.com/shaazzz/FarsiCP/new/master/CF/'+probid+'">Tarjome</a>';
            btnList.appendChild(editbtn);
        }    
        console.log(e);
        return;
    }
    console.log(html);
    let dom = (new DOMParser).parseFromString(html,'text/html');
    console.log(dom);
    let farsiDiv = dom.getElementById('problem-statement');
    console.log(farsiDiv);
    let englishDiv = document.getElementsByClassName('problem-statement')[0];
    console.log(englishDiv);
    englishDiv.outerHTML = farsiDiv.outerHTML;
    let mathsc = document.createElement('script');
    mathsc.innerHTML = `
        console.log(MathJax);
        MathJax.Hub.Config({
           tex2jax: {
             inlineMath: [ ['$','$'], ["\\(","\\)"] ],
             processEscapes: true
           }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "problem-statement"]);`;
    document.body.appendChild(mathsc);
    document.documentElement.scrollTop = 0;
    addButton('https://github.com/shaazzz/FarsiCP/edit/master/CF/'+probid+'/statement.md','virayesh');
    addButton(location.pathname+'?farsi=false','english');
}

async function main(){
    var probid = "1A";
    if (location.pathname.search(/\/problemset\/problem\/.*\/.*/)!=-1){
        probid = location.pathname.replace(/(problem\/|problemset\/|\/)/g,'');
    }
    else if(location.pathname.search(/\/contest\/.*\/problem\/.*/)!=-1){
	probid = location.pathname.replace(/(problem\/|contest\/|\/)/g,'');
    }
    else{
        return;
    }
    let urlparam = new URLSearchParams(location.search);
    if (urlparam.get('farsi')=='false'){
	addButton(location.pathname,'farsi');
	return;
    }
    probid = probid.toUpperCase();
    await loadProblem(probid);
}

main();
