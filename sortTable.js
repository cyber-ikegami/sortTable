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
        select.setAttribute("onchange", "getSelectComboBox();");
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
    // 透過処理
    const inputDiv = document.getElementById("inputDiv");
    const resultDiv = document.getElementById("resultDiv");
    inputDiv.classList.add("disabled");
    resultDiv.classList.remove("disabled");
    
    // const sortOrder = document.getElementById("sortOrder");
    
    // コンボボックス初期化
    // sortOrder.innerHTML = "";
    
	const excelDataValue = document.getElementById('excelData').value;
    const recordList = excelDataValue.split(/\n/g);
    let headerList = recordList[0].split(/[,\t]/g);
    
    for(let i = 0; i < SORT_NUM; i++){
        const comboBoxId = document.getElementById(i);
        let option = document.createElement("option");
        option.text = '';
        option.value = 'null';
        comboBoxId.appendChild(option);
        
        // 1つ目のコンボボックス以外非活性化
        if(!i == 0){
            comboBoxId.setAttribute("disabled", true);
        }
        
        // コンボボックス選択肢追加
        for(let i = 0; i < headerList.length; i++){
            let option = document.createElement('option');
            option.text = headerList[i];
            option.value = i;
            comboBoxId.appendChild(option);
        }
    }
}

// コンボボックス選択時
// null選択時はソート実行ボタン非活性
function getSelectComboBox(){
    const execution = document.getElementById('execution');
    const lastComboBoxId = document.getElementById(SORT_NUM - 1);
    for(let i = 0; i < SORT_NUM; i++){
        const comboBoxId = document.getElementById(i);
        const nextComboBoxId = document.getElementById(i + 1);
        nextComboBoxId.disabled = (comboBoxId.value == 'null' && comboBoxId != SORT_NUM);
        
        execution.disabled = (lastComboBoxId.value == 'null');

    }
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