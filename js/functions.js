//##MODIFICACIONES MATIAS##//

document.addEventListener("DOMContentLoaded", function () {

    let secciones = document.querySelectorAll(".section");
    let botones = document.querySelectorAll(".btn-continuar");

    botones.forEach(function(boton){

        boton.addEventListener("click", function(){

            let actual = this.closest(".section");
            let index = [...secciones].indexOf(actual);

            actual.classList.remove("activa");

            if(secciones[index + 1]){
                secciones[index + 1].classList.add("activa");
            }

            // Si era la última sección mostrar resultado
            if(index + 1 === secciones.length){
                document.querySelector(".total-general").style.display = "block";
                document.querySelector(".btn-success").style.display = "block";
                document.querySelector(".output-section").style.display = "block";
            }

        });

    });

});

//CALENDARIO
flatpickr("#fechaInicio, #fechaFin, #jumpeoFecha", {
    dateFormat: "d/m/Y",
    locale: "es"
});

// Contadores
let contadorTendidos = 1;
let contadorMufasIntervenidas = 1;
let contadorMufasInstaladas = 1;
let contadorNaps = 1;

// Funciones de toggle
function toggleJumpeo(hubo) {
	document.getElementById('camposJumpeo').style.display = hubo ? 'block' : 'none';
	document.getElementById('sinJumpeoMsg').style.display = hubo ? 'none' : 'block';
}

// TENDIDOS
function agregarTendido() {
	const container = document.getElementById('tendidosContainer');
	const index = contadorTendidos;
	const div = document.createElement('div');
	div.className = 'repeatable-section';
	div.id = `tendido-${index}`;
	div.innerHTML = `
		<div class="repeatable-header">
			<h3>TENDIDO #${index + 1}</h3>
			<button type="button" class="btn btn-danger" onclick="eliminarTendido(${index})">X</button>
		</div>
		<div class="form-group">
			<select id="tendidoTipo_${index}" onchange="calcularTotalFibra()">
				<option value="">-- Tipo --</option>
				<option value="12H">12H</option>
				<option value="24H">24H</option>
				<option value="48H">48H</option>
				<option value="96H">96H</option>
			</select>
		</div>
		<div class="inline-group">
			<input type="number" id="tendidoExterno_${index}" placeholder="Ext" onchange="calcularTotalFibra()">
			<input type="number" id="tendidoInterno_${index}" placeholder="Int" onchange="calcularTotalFibra()">
		</div>
		<input type="text" id="tendidoObs_${index}" placeholder="Observación">
	`;
	container.appendChild(div);
	contadorTendidos++;
}

function eliminarTendido(index) {
	const el = document.getElementById(`tendido-${index}`);
	if (el) { el.remove(); calcularTotalFibra(); }
}

function calcularTotalFibra() {
	let total = 0;
	for (let i = 0; i < contadorTendidos; i++) {
		const ext = document.getElementById(`tendidoExterno_${i}`);
		const int = document.getElementById(`tendidoInterno_${i}`);
		if (ext && int) total += (parseFloat(ext.value) || 0) + (parseFloat(int.value) || 0);
	}
	document.getElementById('totalFibraDisplay').innerText = `TOTAL: ${total} METROS`;
}

// MUFAS INTERVENIDAS
function toggleTrabajoMufa(index) {
	const tipo = document.getElementById(`mufaIntTipoTrabajo_${index}`).value;
	document.getElementById(`mufaIntVerificacion_${index}`).style.display = tipo === 'verificacion' ? 'block' : 'none';
	document.getElementById(`mufaIntEmpalme_${index}`).style.display = tipo === 'empalme' ? 'block' : 'none';
}

function agregarMufaIntervenida() {
	const container = document.getElementById('mufasIntervenidasContainer');
	const index = contadorMufasIntervenidas;
	const div = document.createElement('div');
	div.className = 'repeatable-section';
	div.id = `mufaIntervenida-${index}`;
	div.innerHTML = `
		<div class="repeatable-header">
			<h3>MUFA #${index + 1}</h3>
			<button class="btn btn-danger" onclick="eliminarMufaIntervenida(${index})">X</button>
		</div>
		<div class="cantidad-empalmes">EMPALMES</div>
		<input type="number" id="mufaIntCantEmpalmes_${index}" placeholder="Cantidad" style="border:2px solid #17a2b8;" onchange="calcularTotalesEmpalmes()">
		<input type="text" id="mufaIntCodigo_${index}" placeholder="Código">
		<input type="text" id="mufaIntTipo_${index}" placeholder="Tipo">
		<input type="text" id="mufaIntNodo_${index}" placeholder="Nodo">
		<input type="text" id="mufaIntElemento_${index}" placeholder="Elemento">
		
		<select id="mufaIntTipoTrabajo_${index}" onchange="toggleTrabajoMufa(${index})">
			<option value="verificacion">VERIFICACIÓN</option>
			<option value="empalme">EMPALME</option>
		</select>
		
		<div id="mufaIntVerificacion_${index}">
			<textarea id="mufaIntTrabajoVerif_${index}" placeholder="Detalle verificación" rows="2"></textarea>
		</div>
		
		<div id="mufaIntEmpalme_${index}" style="display:none;">
			<div class="empalme-fields">
				<input type="text" id="mufaIntEntrada_${index}" placeholder="Entrada">
				<input type="text" id="mufaIntSalida_${index}" placeholder="Salida">
				<textarea id="mufaIntTrabajoEmp_${index}" placeholder="Descripción" rows="2"></textarea>
			</div>
		</div>
	`;
	container.appendChild(div);
	contadorMufasIntervenidas++;
}

function eliminarMufaIntervenida(index) {
	const el = document.getElementById(`mufaIntervenida-${index}`);
	if (el) { el.remove(); calcularTotalesEmpalmes(); }
}

// MUFAS INSTALADAS
function toggleTrabajoMufaInstalada(index) {
	const tipo = document.getElementById(`mufaInsTipoTrabajo_${index}`).value;
	document.getElementById(`mufaInsVerificacion_${index}`).style.display = tipo === 'verificacion' ? 'block' : 'none';
	document.getElementById(`mufaInsEmpalme_${index}`).style.display = tipo === 'empalme' ? 'block' : 'none';
}

function agregarMufaInstalada() {
	const container = document.getElementById('mufasInstaladasContainer');
	const index = contadorMufasInstaladas;
	const div = document.createElement('div');
	div.className = 'repeatable-section';
	div.id = `mufaInstalada-${index}`;
	div.innerHTML = `
		<div class="repeatable-header">
			<h3>MUFA NUEVA #${index + 1}</h3>
			<button class="btn btn-danger" onclick="eliminarMufaInstalada(${index})">X</button>
		</div>
		<div class="cantidad-empalmes" style="background:#28a745;">EMPALMES</div>
		<input type="number" id="mufaInsCantEmpalmes_${index}" placeholder="Cantidad" style="border:2px solid #28a745;" onchange="calcularTotalesEmpalmes()">
		<input type="text" id="mufaInsTipo_${index}" placeholder="Tipo">
		<input type="text" id="mufaInsCodigo_${index}" placeholder="Código">
		<div class="coord-group">
			<input type="text" id="mufaInsLatitud_${index}" placeholder="Latitud">
			<input type="text" id="mufaInsLongitud_${index}" placeholder="Longitud">
		</div>
		
		<select id="mufaInsTipoTrabajo_${index}" onchange="toggleTrabajoMufaInstalada(${index})">
			<option value="verificacion">VERIFICACIÓN</option>
			<option value="empalme">EMPALME</option>
		</select>
		
		<div id="mufaInsVerificacion_${index}">
			<textarea id="mufaInsTrabajoVerif_${index}" placeholder="Detalle verificación" rows="2"></textarea>
		</div>
		
		<div id="mufaInsEmpalme_${index}" style="display:none;">
			<div class="empalme-fields">
				<input type="text" id="mufaInsEntrada_${index}" placeholder="Entrada">
				<input type="text" id="mufaInsSalida_${index}" placeholder="Salida">
				<textarea id="mufaInsTrabajoEmp_${index}" placeholder="Descripción" rows="2"></textarea>
			</div>
		</div>
		
		<div class="inline-group">
			<input type="text" id="mufaInsPunta_${index}" placeholder="Punta">
			<input type="text" id="mufaInsSangrado_${index}" placeholder="Sangrado">
		</div>
	`;
	container.appendChild(div);
	contadorMufasInstaladas++;
}

function eliminarMufaInstalada(index) {
	const el = document.getElementById(`mufaInstalada-${index}`);
	if (el) { el.remove(); calcularTotalesEmpalmes(); }
}

// NAPS
function agregarNap() {
	const container = document.getElementById('napsContainer');
	const index = contadorNaps;
	const div = document.createElement('div');
	div.className = 'repeatable-section';
	div.id = `nap-${index}`;
	div.innerHTML = `
		<div class="repeatable-header">
			<h3>NAP #${index + 1}</h3>
			<button class="btn btn-danger" onclick="eliminarNap(${index})">X</button>
		</div>
		<input type="text" id="napTipo_${index}" placeholder="Tipo">
		<input type="text" id="napCodigo_${index}" placeholder="Código" onchange="calcularTotalNaps()">
		<div class="inline-group">
			<input type="text" id="napPiso_${index}" placeholder="Piso">
			<input type="text" id="napTorre_${index}" placeholder="Torre">
		</div>
		<input type="text" id="napPotencia_${index}" placeholder="Potencia (dBm)">
	`;
	container.appendChild(div);
	contadorNaps++;
	calcularTotalNaps();
}

function eliminarNap(index) {
	const el = document.getElementById(`nap-${index}`);
	if (el) { el.remove(); calcularTotalNaps(); }
}

function calcularTotalNaps() {
	let total = 0;
	for (let i = 0; i < contadorNaps; i++) {
		const cod = document.getElementById(`napCodigo_${i}`);
		if (cod && cod.value) total++;
	}
	document.getElementById('totalNapsDisplay').innerText = `TOTAL NAPS: ${total}`;
}

function calcularTotalesEmpalmes() {
	let totalInt = 0, totalIns = 0;
	for (let i = 0; i < contadorMufasIntervenidas; i++) {
		const cant = document.getElementById(`mufaIntCantEmpalmes_${i}`);
		if (cant) totalInt += parseInt(cant.value) || 0;
	}
	for (let i = 0; i < contadorMufasInstaladas; i++) {
		const cant = document.getElementById(`mufaInsCantEmpalmes_${i}`);
		if (cant) totalIns += parseInt(cant.value) || 0;
	}
	document.getElementById('totalEmpalmesIntDisplay').innerText = `TOTAL EMPALMES: ${totalInt}`;
	document.getElementById('totalEmpalmesInsDisplay').innerText = `TOTAL EMPALMES: ${totalIns}`;
	document.getElementById('totalGeneralEmpalmes').innerText = `TOTAL EMPALMES: ${totalInt + totalIns}`;
}

function generarTexto() {
	let texto = "STATUS_FINAL_PEXT\n";
	
	// Datos generales
	texto += `ID PROYECTO: ${document.getElementById('idProyectoNum').value || ''} ${document.getElementById('idProyectoNombre').value || ''}\n`;
	texto += `NODO: ${document.getElementById('nodo').value || ''}\n`;
	texto += `COORDENADAS: ${document.getElementById('latitud').value || ''}, ${document.getElementById('longitud').value || ''}\n`;
	texto += `DISTRITO: ${document.getElementById('distrito').value || ''}\n`;
	texto += `TORRES: ${document.getElementById('torres').value || ''}\n`;
	texto += `MONTANTES: ${document.getElementById('montantes').value || ''}\n`;
	texto += `PISOS: ${document.getElementById('pisos').value || ''}\n`;
	texto += `HP: ${document.getElementById('hp').value || ''}\n`;
	texto += `DIRECCI脫N: ${document.getElementById('direccion').value || ''}\n`;
	texto += `FECHA INICIO: ${document.getElementById('fechaInicio').value || ''}\n`;
	texto += `FECHA FIN: ${document.getElementById('fechaFin').value || ''}\n`;
	texto += `SUPERVISOR WIN: ${document.getElementById('supervisor').value || ''}\n`;
	texto += `CONTRATA: ${document.getElementById('contrata').value || ''}\n`;
	texto += `CUADRILLA: ${document.getElementById('cuadrilla').value || ''}\n`;
	texto += "--------------------------------\n";
	
	// Jumpeo
	texto += "JUMPEO EN NODO\n";
	if (document.getElementById('jumpeoSi').checked) {
		texto += `*FECHA: ${document.getElementById('jumpeoFecha').value || ''}\n`;
		texto += `NODO: ${document.getElementById('jumpeoNodo').value || ''}\n`;
		texto += `PATCH PANEL: ${document.getElementById('jumpeoPatchPanel').value || ''}\n`;
		texto += `HILO: ${document.getElementById('jumpeoHilo').value || ''}\n`;
		texto += `ODF_SLOT_OLT: ${document.getElementById('jumpeoOdf').value || ''}\n`;
		texto += `PATCH CORD: ${document.getElementById('jumpeoPatchCord').value || ''}\n`;
		texto += `ACCESOS: REMOTO\n`;
		texto += `*NRO DE VISITAS: ${document.getElementById('jumpeoVisitas').value || ''}\n`;
	} else {
		texto += `*FECHA: \nNODO: \nPATCH PANEL: \nHILO: \nODF_SLOT_OLT: \nPATCH CORD: \nACCESOS: \n*NRO DE VISITAS: \n`;
	}
	texto += "--------------------------------\n";
	
	// Tendido FO
	texto += "TENDIDO FIBRA OPTICA:\n";
	let totalFO = 0;
	for (let i = 0; i < contadorTendidos; i++) {
		const tipo = document.getElementById(`tendidoTipo_${i}`);
		const ext = document.getElementById(`tendidoExterno_${i}`);
		const int = document.getElementById(`tendidoInterno_${i}`);
		const obs = document.getElementById(`tendidoObs_${i}`);
		if (tipo && ext && int) {
			const extVal = ext.value || '0';
			const intVal = int.value || '0';
			const subtotal = (parseFloat(extVal)||0) + (parseFloat(intVal)||0);
			totalFO += subtotal;
			if (obs.value) texto += `\n${obs.value}\n`;
			texto += `*TIPO: ${tipo.value || ''}\n*M.EXTERNO: ${extVal}\n*M.INTERNO: ${intVal}\n*TOTAL: ${subtotal} M\n`;
		}
	}
	texto += `\nTOTAL FIBRA: ${totalFO} METROS\n--------------------------------\n`;
	
	// Mufas intervenidas
	const mufasInt = document.querySelectorAll('[id^="mufaIntervenida-"]').length;
	texto += `MUFAS INTERVENIDAS: ${mufasInt}\n`;
	let totalInt = 0;
	for (let i = 0; i < contadorMufasIntervenidas; i++) {
		const cod = document.getElementById(`mufaIntCodigo_${i}`);
		if (cod) {
			const cant = parseInt(document.getElementById(`mufaIntCantEmpalmes_${i}`)?.value) || 0;
			totalInt += cant;
			texto += `\nMUFA: ${cod.value || ''}\n*EMPALMES: ${cant}\n*TIPO: ${document.getElementById(`mufaIntTipo_${i}`)?.value || ''}\n*NODO: ${document.getElementById(`mufaIntNodo_${i}`)?.value || ''}\n*ELEMENTO: ${document.getElementById(`mufaIntElemento_${i}`)?.value || ''}\n`;
			
			if (document.getElementById(`mufaIntTipoTrabajo_${i}`)?.value === 'verificacion') {
				texto += `TRABAJO: ${document.getElementById(`mufaIntTrabajoVerif_${i}`)?.value || ''}\n`;
			} else {
				texto += `ENTRADA: ${document.getElementById(`mufaIntEntrada_${i}`)?.value || ''}\nSALIDA: ${document.getElementById(`mufaIntSalida_${i}`)?.value || ''}\n`;
				const emp = document.getElementById(`mufaIntTrabajoEmp_${i}`)?.value;
				if (emp) texto += `TRABAJO: ${emp}\n`;
			}
		}
	}
	texto += `\n*PUNTA: ${document.getElementById('mufasIntPunta').value || ''}\n*SANGRADO: ${document.getElementById('mufasIntSangrado').value || ''}\n*TOTAL EMPALMES: ${totalInt}\n--------------------------------\n`;
	
	// Mufas instaladas
	const mufasIns = document.querySelectorAll('[id^="mufaInstalada-"]').length;
	texto += `MUFAS INSTALADAS: ${mufasIns}\n`;
	let totalIns = 0;
	for (let i = 0; i < contadorMufasInstaladas; i++) {
		const cod = document.getElementById(`mufaInsCodigo_${i}`);
		if (cod) {
			const cant = parseInt(document.getElementById(`mufaInsCantEmpalmes_${i}`)?.value) || 0;
			totalIns += cant;
			texto += `\nMUFA NUEVA:\n*EMPALMES: ${cant}\n*TIPO: ${document.getElementById(`mufaInsTipo_${i}`)?.value || ''}\n*C脫DIGO: ${cod.value || ''}\n*UBICACI脫N: ${document.getElementById(`mufaInsLatitud_${i}`)?.value || ''}, ${document.getElementById(`mufaInsLongitud_${i}`)?.value || ''}\n`;
			
			if (document.getElementById(`mufaInsTipoTrabajo_${i}`)?.value === 'verificacion') {
				texto += `TRABAJO: ${document.getElementById(`mufaInsTrabajoVerif_${i}`)?.value || ''}\n`;
			} else {
				texto += `ENTRADA: ${document.getElementById(`mufaInsEntrada_${i}`)?.value || ''}\nSALIDA: ${document.getElementById(`mufaInsSalida_${i}`)?.value || ''}\n`;
				const emp = document.getElementById(`mufaInsTrabajoEmp_${i}`)?.value;
				if (emp) texto += `TRABAJO: ${emp}\n`;
			}
			texto += `*PUNTA: ${document.getElementById(`mufaInsPunta_${i}`)?.value || ''}\n*SANGRADO: ${document.getElementById(`mufaInsSangrado_${i}`)?.value || ''}\n`;
		}
	}
	texto += `\n*TOTAL EMPALMES INSTALADAS: ${totalIns}\n--------------------------------\n`;
	texto += `TOTAL GENERAL EMPALMES: ${totalInt + totalIns}\n--------------------------------\n`;
	
	// Naps
	texto += "NAPS HABILITADAS:\n";
	let totalNaps = 0;
	for (let i = 0; i < contadorNaps; i++) {
		const cod = document.getElementById(`napCodigo_${i}`);
		if (cod && cod.value) {
			totalNaps++;
			texto += `\n*TIPO: ${document.getElementById(`napTipo_${i}`)?.value || ''}\n*C脫DIGO: ${cod.value}\n*UBICACI脫N: PISO ${document.getElementById(`napPiso_${i}`)?.value || ''} TORRE ${document.getElementById(`napTorre_${i}`)?.value || ''}\n*POTENCIA: ${document.getElementById(`napPotencia_${i}`)?.value || ''} dBm\n`;
		}
	}
	texto += `\nTOTAL NAPS: ${totalNaps}\n\nPREPARACI脫N\n*PUNTA: ${document.getElementById('prepPunta').value || ''}\n*SANGRADO: ${document.getElementById('prepSangrado').value || ''}\n*EMPALMES: ${document.getElementById('prepTotalEmpalmes').value || ''}\n--------------------------------\n`;
	
	// Ferreter铆a
	texto += "FERRETER脥A:\n";
	texto += `*CANALETA: ${document.getElementById('ferrCanaleta').value || ''}\n`;
	texto += `*REDUCTOR: ${document.getElementById('ferrReductor').value || ''}\n`;
	const brazoTipo = document.getElementById('ferrBrazoTipo').value;
	const brazoCant = document.getElementById('ferrBrazoCant').value;
	texto += `*BRAZO EXTENSOR: ${brazoTipo}${brazoCant ? ' - ' + brazoCant : ''}\n`;
	texto += `*CRUCETA: ${document.getElementById('ferrCruceta').value || ''}\n`;
	texto += `*PREFORMADOS: ${document.getElementById('ferrPreformados').value || ''}\n`;
	texto += `*PORTA LINEA: ${document.getElementById('ferrClevis').value || ''}\n`;
	texto += `*CABLE ACERADO: ${document.getElementById('ferrCableAcerado').value || ''}\n`;
	texto += `*CHAPA TENSORA: ${document.getElementById('ferrChapa').value || ''}\n`;
	texto += "--------------------------------\n";
	
	// Material planta interna
	texto += "MATERIAL PLANTA INTERNA\n";
	const tubTipo = document.getElementById('matTuberiaTipo').value;
	const tubMet = document.getElementById('matTuberiaMetraje').value;
	texto += `*TUBERIA: ${tubTipo}${tubMet ? ' - ' + tubMet + ' MTS' : ''}\n`;
	const cajaTipo = document.getElementById('matCajaTipo').value;
	const cajaCant = document.getElementById('matCajaCant').value;
	texto += `*CAJA MET脕LICA: ${cajaTipo}${cajaCant ? ' - ' + cajaCant : ''}\n`;
	texto += `*DUCTO: ${document.getElementById('matDucto').value || ''}\n`;
	texto += "--------------------------------\n";
	
	// Infraestructura terceros
	texto += "INFRAESTRUCTURA DE TERCEROS:\n";
	texto += `POSTES: ${document.getElementById('infPostes').value || ''}\n`;
	texto += `OPERADOR: ${document.getElementById('infOperador1').value || ''}\n`;
	texto += `CANALIZADO: ${document.getElementById('infCanalizado').value || ''}\n`;
	texto += `OPERADOR: ${document.getElementById('infOperador2').value || ''}\n`;
	texto += "--------------------------------\n";
	
	// Adicionales
	texto += "TRABAJOS ADICIONALES:\n";
	texto += `${document.getElementById('trabajosAdicionales').value || ''}\n\n`;
	texto += `${document.getElementById('resultadoFinal').value || 'PREDIO_PEXT_HABILITADO'}\n`;
	
	document.getElementById('outputText').innerText = texto;
}

function copiarTexto() {
	const text = document.getElementById('outputText').innerText;
	navigator.clipboard.writeText(text).then(() => alert('鉁?Copiado')).catch(() => alert('鉂?Error'));
}

window.onload = function() {
	toggleJumpeo(false);
	calcularTotalFibra();
	calcularTotalesEmpalmes();
	calcularTotalNaps();
	toggleTrabajoMufa(0);
	toggleTrabajoMufaInstalada(0);
};