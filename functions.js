read_base_values = function() {
	var nu_pg_pct = document.getElementById('nuller_pg').value;
	var nu_vg_pct = document.getElementById('nuller_vg').value;
	var nu_h2_pct = document.getElementById('nuller_h2o').value;
	var nu_ni_mgl = document.getElementById('nuller_nic').value;

	var ni_pg_pct = document.getElementById('nicbase_pg').value;
	var ni_vg_pct = document.getElementById('nicbase_vg').value;
	var ni_h2_pct = document.getElementById('nicbase_h2o').value;
	var ni_ni_mgl = document.getElementById('nicbase_nic').value;

	var ar_pct = document.getElementById('aromaprozent').value;
	var ar_pg_pct = document.getElementById('aroma_pg').value;
	var ar_vg_pct = document.getElementById('aroma_vg').value;
	var ar_h2_pct = document.getElementById('aroma_h2o').value;

	var zu_pct = document.getElementById('zu_prozent').value;
	var zu_pg_pct = document.getElementById('zu_pg').value;
	var zu_vg_pct = document.getElementById('zu_vg').value;
	var zu_h2_pct = document.getElementById('zu_h2o').value;

	var liqtot = document.getElementById('Gesamtmenge').value;
	var sollnic = document.getElementById('sollnic').value;

	return {
		nu_pg_pct: nu_pg_pct, nu_vg_pct: nu_vg_pct, nu_h2_pct: nu_h2_pct, nu_ni_mgl: nu_ni_mgl,
		ni_pg_pct: ni_pg_pct, ni_vg_pct: ni_vg_pct, ni_h2_pct: ni_h2_pct, ni_ni_mgl: ni_ni_mgl,
		ar_pct: ar_pct, ar_pg_pct: ar_pg_pct, ar_vg_pct: ar_vg_pct, ar_h2_pct: ar_h2_pct,
		zu_pct: zu_pct, zu_pg_pct: zu_pg_pct, zu_vg_pct: zu_vg_pct, zu_h2_pct: zu_h2_pct,
		liqtot: liqtot, sollnic: sollnic };
}


getmls = function() {
	var bv = read_base_values();
	var nic = parseFloat( bv.liqtot/(bv.ni_ni_mgl/bv.sollnic) );
	var aro = parseFloat( (bv.liqtot/100)*bv.ar_pct );
	var zus = parseFloat( (bv.liqtot/100)*bv.zu_pct );
	var nul = parseFloat( bv.liqtot-(nic+aro+zus) );

	return {
		nul: nul, nic: nic, aro: aro, zus: zus
	};
}

getpct = function() {
	var bv = read_base_values();
	var ml = getmls();

	var pg_total_ml = parseFloat( bv.nu_pg_pct*ml.nul + bv.ni_pg_pct*ml.nic + bv.ar_pg_pct*ml.aro + bv.zu_pg_pct*ml.zus );
	var vg_total_ml = parseFloat( bv.nu_vg_pct*ml.nul + bv.ni_vg_pct*ml.nic + bv.ar_vg_pct*ml.aro + bv.zu_vg_pct*ml.zus );
	var zu_total_ml = parseFloat( bv.nu_h2_pct*ml.nul + bv.ni_h2_pct*ml.nic + bv.ar_h2_pct*ml.aro + bv.zu_h2_pct*ml.zus );

	var pg = parseFloat(pg_total_ml/bv.liqtot);
	var vg = parseFloat(vg_total_ml/bv.liqtot);
	var zu = parseFloat(zu_total_ml/bv.liqtot);

	return {
		pg: pg, vg: vg, zu: zu
	};
}

get_aro_pct = function () {
	var a1 = parseFloat(document.getElementById('aroma1').value);
	var a2 = parseFloat(document.getElementById('aroma2').value);
	var a3 = parseFloat(document.getElementById('aroma3').value);
	var a4 = parseFloat(document.getElementById('aroma4').value);

	var sum = parseFloat(a1+a2+a3+a4);
	if (sum !== 100) {
		alert('Aromenprozent sollten zusammen 100 ergeben ;)');
		return false;
	}

	return {
		a1:a1, a2:a2, a3:a3, a4:a4
	};
}

calculate_overall = function() {
	var ml = getmls();
	var pc = getpct();

	document.getElementById('nulbase_ml').innerHTML = ml.nul+' ml';
	document.getElementById('nicbase_ml').innerHTML = ml.nic+' ml';
	document.getElementById('aroma_ml').innerHTML = ml.aro+' ml';
	document.getElementById('zusatz_ml').innerHTML = ml.zus+' ml';

	document.getElementById('end_pg').innerHTML = pc.pg.toFixed(2)+' %';
	document.getElementById('end_vg').innerHTML = pc.vg.toFixed(2)+' %';
	document.getElementById('end_h2o').innerHTML = pc.zu.toFixed(2)+' %';
}

calculate_single = function() {
	var bv = read_base_values();
	var ml = getmls();

	var teil = parseFloat(document.getElementById('Einzelmenge').value);
	var Faktor = parseFloat(teil/bv.liqtot);
	var aro_tot = parseFloat(ml.aro*Faktor);
	var pcts = get_aro_pct();

	var ea1 = parseFloat(aro_tot * (pcts.a1/100));
	var ea2 = parseFloat(aro_tot * (pcts.a2/100));
	var ea3 = parseFloat(aro_tot * (pcts.a3/100));
	var ea4 = parseFloat(aro_tot * (pcts.a4/100));

	document.getElementById('einzel_null').innerHTML = parseFloat(ml.nul*Faktor)+' ml';
	document.getElementById('einzel_nico').innerHTML = parseFloat(ml.nic*Faktor)+' ml';
	document.getElementById('einzel_h2o').innerHTML =  parseFloat(ml.zus*Faktor)+' ml';
	document.getElementById('einzel_arom').innerHTML =  aro_tot+' ml';
	document.getElementById('aroma1_ml').innerHTML = ea1+' ml';
	document.getElementById('aroma2_ml').innerHTML = ea2+' ml';
	document.getElementById('aroma3_ml').innerHTML = ea3+' ml';
	document.getElementById('aroma4_ml').innerHTML = ea4+' ml';


}
