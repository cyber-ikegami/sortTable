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
    // 透過処理
    const inputDiv = document.getElementById("inputDiv");
    const resultDiv = document.getElementById("resultDiv");
    inputDiv.classList.add("disabled");
    resultDiv.classList.remove("disabled");
    
    addOption(0);
    
    // 1つ目のコンボボックス以外非活性化
    for(let j = 1; j < SORT_NUM; j++){
        document.getElementById(j).setAttribute("disabled", true);
    }
}

// コンボボックスの選択肢追加
function addOption(id){
    const excelDataValue = document.getElementById('excelData').value;
    const recordList = excelDataValue.split(/\n/g);
    let headerList = recordList[0].split(/[,\t]/g);
    const comboBoxId = document.getElementById(id);
    
    comboBoxId.remove('');
    for(let i = 0; i < headerList.length; i++){
        comboBoxId.remove(i);
    }
    
    let option = document.createElement("option");
    option.text = '';
    option.value = '';
    comboBoxId.appendChild(option);
    
    for(let i = 0; i < headerList.length; i++){
        let option = document.createElement('option');
        option.text = headerList[i];
        option.value = i;
        comboBoxId.appendChild(option);
    }
}

// コンボボックス選択時
// 1つ目のコンボボックスにて空白選択時はソート実行ボタン非活性
function getSelectComboBox(obj){
    const execution = document.getElementById('execution');
    const firstComboBoxId = document.getElementById(0);
    const comboBoxId = document.getElementById(Number(obj.id));

    let i = Number(obj.id) + 1;
    const backComboBox = document.getElementById(i);

    backComboBox.disabled = (comboBoxId.value == '');
    if(i < SORT_NUM){
    // for(let j = i; j < SORT_NUM; j++){
        if(backComboBox.disabled){
            // コンボボックスを初期化したい
            backComboBox.value = "";
        } else {
            addOption(i);
            // addOption(j);
        }
    }
    // 実行ボタン活性化・非活性化
    execution.disabled = (firstComboBoxId.value == ''); 
}


// ソート実行ボタン押下時動作
function outputResult() {
    const result = document.getElementById('result');
    result.disabled = false;
    
    const excelDataValue = document.getElementById('excelData').value;
    let recordList = excelDataValue.split(/\n/g);
    let dataList = [];
    for(let i = 0; i < recordList.length; i++){
        dataList[i] = recordList[i].split(/[,\t]/g);
    }
    
    const selectValue = document.getElementById('sortOrder').value;
    let outputValue = '';
    
    dataList.sort (function(a, b) {
        return(a[selectValue] - b[selectValue]);
    });
        
    let val = dataList.join('\n');
    outputValue = val.replace(/,/g, '\t');

    resultForm.resultTextArea.value = outputValue;
}