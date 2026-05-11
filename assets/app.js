const yearEl=document.getElementById('year');
const makeEl=document.getElementById('make');
const modelEl=document.getElementById('model');

for(let y=2026;y>=1985;y--){
yearEl.innerHTML+=`<option>${y}</option>`;
}

const makes={
Ford:['Mustang','F-150','Explorer'],
Toyota:['Camry','Corolla','Tacoma'],
Honda:['Civic','Accord','CR-V'],
BMW:['330i','M3','X5'],
Nissan:['Altima','370Z','Rogue']
};

yearEl.addEventListener('change',()=>{
makeEl.innerHTML='<option>Select Make</option>';

Object.keys(makes).forEach(make=>{
makeEl.innerHTML+=`<option>${make}</option>`;
});
});

makeEl.addEventListener('change',()=>{
modelEl.innerHTML='<option>Select Model</option>';

makes[makeEl.value].forEach(model=>{
modelEl.innerHTML+=`<option>${model}</option>`;
});
});

const diagnosticTree={
'Wheels & Tires':{
symptoms:['Rear wheel noise','Front wheel noise','Vibration'],
conditions:['Highway speed','Turning','Braking']
},
'Engine':{
symptoms:['Rough idle','Overheating','Oil smell'],
conditions:['Idle','Acceleration','After driving']
},
'Brakes':{
symptoms:['Grinding','Squeaking','Soft pedal'],
conditions:['Braking','Low speed','High speed']
}
};

const categoryEl=document.getElementById('category');
const symptomEl=document.getElementById('symptom');
const conditionEl=document.getElementById('condition');

Object.keys(diagnosticTree).forEach(category=>{
categoryEl.innerHTML+=`<option>${category}</option>`;
});

function updateSymptoms(){

const data=diagnosticTree[categoryEl.value];

symptomEl.innerHTML='';
conditionEl.innerHTML='';

data.symptoms.forEach(symptom=>{
symptomEl.innerHTML+=`<option>${symptom}</option>`;
});

data.conditions.forEach(condition=>{
conditionEl.innerHTML+=`<option>${condition}</option>`;
});

}

categoryEl.addEventListener('change',updateSymptoms);

updateSymptoms();

document.getElementById('analyzeBtn').addEventListener('click',()=>{

alert(
'Diagnostic generated successfully. This would normally display likely causes estimated pricing and shop inspection points.'
);

});
