// コンボボックスの数
const SORT_NUM = 3;

// コンボボックス追加
function AddcomboBox(){
    for(let i = 0; i < SORT_NUM; i++){
        const selectDiv = document.getElementById("sortOrder");
        const select = document.createElement("select");
        select.classList.add("width");
        selectDiv.appendChild(select);
        select.setAttribute("id", i);
        select.setAttribute("onchange", "getSelectComboBox(this);");
    }
}

// 入力必須チェック
function inputRequiredCheck() {
    const excelData = document.getElementById("excelData");
	const load = document.getElementById("load");
    load.disabled = (excelData.value == "");
}

// 読み込みボタン押下時動作
function getHeaderData(){
    const inputDiv = document.getElementById("inputDiv");
    const resultDiv = document.getElementById("resultDiv");
    inputDiv.classList.add("disabled");
    resultDiv.classList.remove("disabled");
    
    addOption(0);
    
    for(let j = 1; j < SORT_NUM; j++){
        document.getElementById(j).setAttribute("disabled", true);
    }
}

// コンボボックスの選択肢追加
function addOption(id){
    const excelDataValue = document.getElementById('excelData').value;
    const recordList = excelDataValue.split(/\n/g);
    let headerList = recordList[0].split(/[,\t]/g);

    let option = document.createElement("option");
    const nextComboBox = document.getElementById(id);
    let selectOptionArray = new Array();

    for(let j = 0; j < id; j++){
        const comboBox = document.getElementById(j);
        selectOptionArray.push(comboBox.value);
    }
    
    nextComboBox.innerHTML = '';
    option.text = '';
    option.value = '';
    nextComboBox.appendChild(option);
    
    for(let i = 0; i < headerList.length; i++){
        if(!selectOptionArray.includes(String(i))){
            let option = document.createElement('option');
            option.text = headerList[i];
            option.value = i;
            nextComboBox.appendChild(option);
        }
    }
}

// コンボボックス選択時
// 1つ目のコンボボックスにて空白選択時はソート実行ボタン非活性
function getSelectComboBox(obj){
    const execution = document.getElementById('execution');
    const firstComboBox = document.getElementById(0);
    const selectComboBox = document.getElementById(Number(obj.id));
    const nextComboBox = document.getElementById(Number(obj.id) + 1);

    for(let i = (Number(obj.id) + 1); i < SORT_NUM; i++) {
        const backComboBox = document.getElementById(i);
        backComboBox.innerHTML = '';
        backComboBox.disabled = true;

        if(selectComboBox.value != ''){
            nextComboBox.disabled = false;
            addOption(Number(obj.id) + 1);
        }
    }
    execution.disabled = (firstComboBox.value == ''); 
}

// ソート実行ボタン押下時動作
function outputResult() {
    const result = document.getElementById('result');
    result.disabled = false;
    
    const excelDataValue = document.getElementById('excelData').value;
    let recordList = excelDataValue.split(/\n/g);
    
    let dataList = new Array();
    for(let i = 0; i < recordList.length; i++){
        dataList[i] = recordList[i].split(/[,\t]/g);
    }

    dataList.sort (function(a, b) {
        for(let j = 0; j < SORT_NUM; j++){
            const comboBox = document.getElementById(j).value;
            if(j != (SORT_NUM - 1)){
                dataList.sort(a[comboBox] - b[comboBox]);
            } else {
                return(a[comboBox] - b[comboBox]);
            }
        }
    });

    let outputValue = '';
    let val = dataList.join('\n');
    outputValue = val.replace(/,/g, '\t');

    resultForm.resultTextArea.value = outputValue;
}
