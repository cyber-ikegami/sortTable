// コンボボックス追加
function AddcomboBox(){
    const SORT_NUM = 3;
    let option = document.createElement("option"); 
    for(let i = 0; i < SORT_NUM; i++){
        const selectDiv = document.getElementById("sortOrder");
        const select = document.createElement("select");
        select.classList.add("width");
        selectDiv.appendChild(select);
    }
}

// 入力必須チェック
function inputRequiredCheck() {
	const excelData = document.getElementById("excelData");
	const load = document.getElementById("load");

    load.disabled = (excelData.value == "");
}

// 読み込みボタン押下時動作
// ヘッダーの値を取得し、ソート順コンボボックスに出力
function getHeaderData(){
    const inputDiv = document.getElementById("inputDiv");
    const resultDiv = document.getElementById("resultDiv");
    const sortOrder = document.getElementById("sortOrder");

    inputDiv.classList.add("disabled");
    resultDiv.classList.remove("disabled");

    // コンボボックス初期化
    sortOrder.innerHTML = "";
    
	const excelDataValue = document.getElementById('excelData').value;
    const recordList = excelDataValue.split(/\n/g);
    let headerList = recordList[0].split(/[,\t]/g);
    
    let option = document.createElement("option");
    option.text = '';
    option.value = 'null';
    sortOrder.appendChild(option);
    
    // コンボボックス選択肢追加
    for(let i = 0; i < headerList.length; i++){
        let option = document.createElement('option');
        option.text = headerList[i];
        option.value = i;
        sortOrder.appendChild(option);
    }
}

// コンボボックス選択時
// null選択時はソート実行ボタン非活性
function getSelectComboBox(){
    const execution = document.getElementById('execution');
    execution.disabled = (sortOrder.value == 'null');
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