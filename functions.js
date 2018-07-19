
calculate_overall = function() {
	var nul_pg = document.getElementById('nuller_pg').value;
	var nul_vg = document.getElementById('nuller_vg').value; 
	var nul_nic = document.getElementById('nuller_nic').value; 

	var nicbase_pg = document.getElementById('nicbase_pg').value;
	var nicbase_vg = document.getElementById('nicbase_vg').value;
	var nicbase_nic = document.getElementById('nicbase_nic').value;

	var aroma_pct = document.getElementById('aromaprozent').value;
	var aroma_pg = document.getElementById('aroma_pg').value;
	var aroma_vg = document.getElementById('aroma_vg').value;

	var gesamtmenge = document.getElementById('Gesamtmenge').value;
	var sollnic = document.getElementById('sollnic').value;

	var nicml = parseFloat(gesamtmenge)/(parseFloat(nicbase_nic)/parseFloat(sollnic));
	var aromaml = parseFloat((gesamtmenge/100)*aroma_pct);
	var nulbaseml = parseFloat((gesamtmenge - aromaml) - nicml);

	var endpg =  parseFloat((((nulbaseml*(nul_pg/100)) +  (nicml*(nicbase_pg/100)) + (aromaml*(aroma_pg/100))) / gesamtmenge)*100).toFixed(2);
	var endvg =  parseFloat(100-endpg).toFixed(2);


	document.getElementById('nulbase_ml').innerHTML = nulbaseml;
	document.getElementById('aroma_ml').innerHTML = aromaml;
	document.getElementById('nicbase_ml').innerHTML = nicml;
	document.getElementById('end_pg').innerHTML = endpg;
	document.getElementById('end_vg').innerHTML = endvg; 
}

calculate_single = function() {
	var nul_pg = document.getElementById('nuller_pg').value;
	var nul_vg = document.getElementById('nuller_vg').value; 
	var nul_nic = document.getElementById('nuller_nic').value; 

	var nicbase_pg = document.getElementById('nicbase_pg').value;
	var nicbase_vg = document.getElementById('nicbase_vg').value;
	var nicbase_nic = document.getElementById('nicbase_nic').value;

	var aroma_pct = document.getElementById('aromaprozent').value;
	var aroma_pg = document.getElementById('aroma_pg').value;
	var aroma_vg = document.getElementById('aroma_vg').value;

	var gesamtmenge = document.getElementById('Gesamtmenge').value;
	var einzelmenge = document.getElementById('Einzelmenge').value;
	var Faktor = parseFloat(einzelmenge/gesamtmenge);
	var sollnic = document.getElementById('sollnic').value;

	var nicml = parseFloat(gesamtmenge)/(parseFloat(nicbase_nic)/parseFloat(sollnic));
	var aromaml = parseFloat((gesamtmenge/100)*aroma_pct);
	var nulbaseml = parseFloat((gesamtmenge - aromaml) - nicml);

	document.getElementById('einzel_null').innerHTML = parseFloat(nulbaseml*Faktor); 
	document.getElementById('einzel_nico').innerHTML = parseFloat(nicml*Faktor); 
	document.getElementById('einzel_arom').innerHTML = parseFloat(aromaml*Faktor); 
}

calculate_arome = function() {
	var aroma_flasche = document.getElementById('einzel_arom').value;
	window.alert(document.getElementById('einzel_arom').value);
}

