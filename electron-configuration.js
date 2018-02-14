var ec = function( element ){
  var els;
  var db = elements;
  if( element === undefined ) return "Help me help you; give me something to go on. i.e. 'C', or 'oxygen' or 23";
  if( db === undefined ){
    fs.readFile('elments.js','utf8',(err,data)=>{
      db = JSON.parse( data );
      console.log( db );
    });
  }
  if ( isNaN(element) ){
		var e = db.elements.find( (a)=>{
      return a.name.toLowerCase()==element.toLowerCase() || a.symbol.toLowerCase()==element.toLowerCase();
    });
  	if( e===undefined ) return "element not found";
    els = e.number;
    console.log( e );
  } else {
    var e = db.elements.find( (a)=>{
      return a.number==element;
    });
  	if( e===undefined ) return "element not found";
		console.log( e );
    els = element;
  }
  let pat = [
    {'1s':2},
    {'2s':2},
    {'2p':6},{'3s':2},
    {'3p':6},{'4s':2},
    {'3d':10},{'4p':6},{'5s':2},
    {'4d':10},{'5p':6},{'6s':2},
    {'4f':14},{'5d':10},{'6p':6},{'7s':2},
    {'5f':14},{'6d':10},{'7p':6},
    {'5g':18},{'6f':14},{'7d':10},
    {'6g':18},{'7f':14},
    {'6h':22},{'7g':18},
    {'7h':22},
    {'7i':26}
  ];
  
  var config = [];
  pat.forEach( (c,i,a) => {
    let p = Object.keys(c)[0];
    if( els > c[p] ){
      config.push(p+''+c[p]);
      els-=c[p];
    } else if( els > 0 ){
      let ee = "";
      for( i=0;i<c[p]-els;i++ ){ ee+='+'; }
      config.push(p+''+els+''+ee);
      els = 0;
    }
  });
  return config.sort((a,b)=>a.charCodeAt(0)-b.charCodeAt(0)).join(" ");
}

