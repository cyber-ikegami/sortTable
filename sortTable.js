// 入力必須チェック
function inputRequiredCheck() {
	const excelData = document.getElementById("excelData");
	const load = document.getElementById("load");

    if(excelData.value == ""){
        load.disabled = true;
    } else {
        load.disabled = false;
    }
}

// 読み込みボタン押下時動作
// ヘッダーの値を取得し、ソート順コンボボックスに出力
function getHeaderData(){
    const sortOrder = document.getElementById('sortOrder');
    const execution = document.getElementById('execution');
    sortOrder.disabled = false;
    execution.disabled = false;
    
    // コンボボックス初期化
    sortOrder.innerHTML = "";

	const excelDataValue = document.getElementById('excelData').value;
    const recordList = excelDataValue.split(/\n/g);
    let headerList = recordList[0].split(/[,\t]/g);

    let option = document.createElement("option");
    option.text = '';
    option.value = 'null';
    sortOrder.appendChild(option);
    
    for(let i = 0; i < headerList.length; i++){
        let option = document.createElement('option');
        option.text = headerList[i];
        option.value = i;
        sortOrder.appendChild(option);
    }
}

// ソート実行ボタン押下時動作
// 選択中の項目のvalue（インデックス）をアラートで出す
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

    if(selectValue == 'null'){
        outputValue = '選択されているのは空白です';
    } else {
        for(let i = 1; i < dataList.length; i++){
            outputValue = outputValue + dataList[i][selectValue];
            if(i != (dataList.length - 1)){
                outputValue = outputValue + ',';
            }   
        }
    }
    alert(outputValue)
}