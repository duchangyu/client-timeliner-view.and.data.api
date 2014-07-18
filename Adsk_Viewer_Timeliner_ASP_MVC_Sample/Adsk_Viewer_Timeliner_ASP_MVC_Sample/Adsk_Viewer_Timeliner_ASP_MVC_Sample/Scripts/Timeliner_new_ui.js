//Copyright (c) Autodesk, Inc. All rights reserved
//Autodesk Developer Network (ADN)
//Permission to use, copy, modify, and distribute this software 
//in object code form for any purpose and without fee is hereby granted,
//provided that the above copyright notice appears in all copies and that
//both that copyright notice and the limited warranty and restricted rights
//notice below appear in all supporting documentation.
//AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS. AUTODESK SPECIFICALLY 
//DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE. AUTODESK, INC. 
//DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE UNINTERRUPTED OR ERROR FREE.


var pstyle = 'background-color: #F5F6F7; border: 1px solid #dfdfdf; padding: 5px;';

    var viewer3D;

    var currentViewerDoc;

    var currNodes = [];

    var currNode = null;

    var curDbId;

    var curModelItemName;

    var selectMouseStart = false;

    var tooltipText = "";

    var playCurNode = null;

    function seeModelItem(modelId) {

        if (modelId > 0) {
            viewer3D.isolateById(modelId); 
        }
    }
    function showOneNode() {
        if (playCurNode != null && playCurNode.dbId > 0) {
            viewer3D.show(playCurNode);
            console.log(playCurNode.dbId);
        }
    }

    function showOneNode1(thisNode) {
        if (thisNode != null && thisNode.dbId > 0) {
            viewer3D.show(thisNode);
        }
    }

    function resetIsolate() {

        viewer3D.showAll();

    }

    function sortOnKeys(dict) {

        var sorted = [];
        for (var key in dict) {
            sorted[sorted.length] = key;
        }
        sorted.sort();

        var tempDict = {};
        for (var i = 0; i < sorted.length; i++) {
            tempDict[sorted[i]] = dict[sorted[i]];
        }

        return tempDict;
    }

(function (window) {


    function getObjectTreeCB(result) {

        var nd = [];
        for (var i in w2ui['divModelTree'].nodes)
            nd.push(w2ui['divModelTree'].nodes[i].id);
        w2ui['divModelTree'].remove.apply(w2ui['divModelTree'], nd);
      
        geometryItems_children = result.children;
        currNodes = [];         
        for (i = 0; i < geometryItems_children.length; i++) {
             
            currNodes.push(geometryItems_children[i]);

            var idStr = "id" + (w2ui['divModelTree'].nodes.length + 1).toString();
            w2ui['divModelTree'].add([{ id: w2ui['divModelTree'].nodes.length + 1, text: geometryItems_children[i].name, img: 'icon-page' }]);
        }
    }

  

    //model
    $('#divModelButtons').w2toolbar({
        name: 'divModelButtons',
        items: [
            { type: 'button', id: 'btnloadmodel', caption: 'Model Tree', img: 'icon-reload' }
        ],
        onClick: function (event) {
            console.log('item ' + event.target + ' is clicked.');
            if (event.target == 'btnloadmodel') {
                if(viewer3D!=null)
                  viewer3D.getObjectTree(getObjectTreeCB);
            }

             
        }
    });

    $('#divModelTree').w2sidebar({
        name: 'divModelTree',
        img: null,
        
        onClick: function (event) {
            console.log(event.target);
            var index = parseInt(event.target);
            if (index > -1) {
                currNode = currNodes[index];
                var selectedObjectdbId = currNode.dbId;
                curDbId = currNode.dbId;
                viewer3D.isolateById(selectedObjectdbId);
            }
        },
        onContextMenu: function (event) {
            console.log(event);

            viewer3D.showAll();
            var taskIndex = w2ui['divTBContainer'].getSelection();
            if (taskIndex > 0) {

                console.log(event.target);
                var modelIndex = parseInt(event.target);
                if (modelIndex > -1) {
                    currNode = currNodes[modelIndex - 1];
                    var selectedObjectdbId = currNode.dbId;
                    curDbId = currNode.dbId;
                    var xx = "<a href=\"javascript:void(0);\" onmousedown=\"seeModelItem(" + curDbId + ");\" onmouseup=\"resetIsolate();\">" + currNode.name + "</a>";
                    w2ui.divTBContainer.records[taskIndex - 1].gridmodel = xx;
                    w2ui.divTBContainer.refresh();

                }
            }
            else {
                alert("no task is selected!");
            }

           
        },
        onDblClick: function (event) {
            console.log(event);
            resetIsolate();
        }

    });

    $('#divModelPanel').w2layout({
        name: 'divModelPanel',
        panels: [
            { type: 'top', size: 30, resizable: false, style: pstyle, content: 'top' },
            { type: 'main', style: pstyle, content: 'main' }
        ]
    });

    w2ui['divModelPanel'].content('top', w2ui['divModelButtons']);
    w2ui['divModelPanel'].content('main', w2ui['divModelTree']);


   


    //task table grid
    var _taskType = [
        { id: 1, text: 'Construct' },
        { id: 2, text: 'Demolish' },
    ];


    $('#divTBContainer').w2grid({
        name: 'divTBContainer',
        header: 'List of Tasks',
        show: {           
            header: true
        },
        columns: [
            { field: 'gridtaskid', caption: 'Id', size: '5%', resizable: false },
            { field: 'gridtaskname', caption: 'Name', size: '19%', resizable: true, changed: true, editable: { type: 'text' } },
            { field: 'gridstadate', caption: 'Start Date', size: '19%', resizable: true, changed: true, render: 'date', editable: { type: 'date' } },
            { field: 'gridenddate', caption: 'End Date', size: '19%', resizable: true, changed:true, render: 'date', editable: { type: 'date' } },
            {
                field: 'gridtasktype', caption: 'Type', size: '19%', changed: true, editable: { type: 'select', items: _taskType },
                render: function (record, index, col_index) {
                    var html = '';
                    for (var p in _taskType) {
                        if (_taskType[p].id == this.getCellValue(index, col_index))
                            html = _taskType[p].text;
                    }
                    return html;
                }
            },
            { field: 'gridmodel', caption: 'Model', size: '19%', resizable: true, changed: true}
        ],
        records: [
            { recid: 1, gridtaskid: "1", gridtaskname: "Peter", gridstadate: "1/16/2014", gridenddate: "1/16/2014", gridtasktype: 1, gridmodel: 'attach a model' }
        ]
    });


    var keysArray;
    function getTableData() {
        w2ui.divTBContainer.save();
        var playDic = new Array();
        keysArray = [];
        for (var index = 0 ; index < w2ui['divTBContainer'].records.length;index++) {
            var this_enddate = w2ui['divTBContainer'].records[index].gridenddate;
            var this_dbid = w2ui['divTBContainer'].records[index].gridmodel;           
            var tempIndex = this_dbid.indexOf("seeModelItem(");
            if (tempIndex < 0)
                continue;
            var tempIndex1 = this_dbid.indexOf(")", tempIndex + 12);

            this_dbid = this_dbid.substr(tempIndex + 13, tempIndex1 - tempIndex - 13);

            if (this_enddate != "N/A" && this_dbid > 0) {
                var date = parseInt(Date.parse(this_enddate.replace(/-/g, "/")));
                if (date in playDic) {
                    playDic[date].push(parseInt(this_dbid));
                }
                else {
                    var ids = [];
                    ids.push(parseInt(this_dbid));
                    playDic[date] = ids;
                    keysArray.push(date);
                }
            }
        }           

        playDic = sortOnKeys(playDic);

        return playDic;
    }

    function importTasks(filecontent) {
        var data = $.csv.toArrays(filecontent);
        for (i = 0; i < data.length; i++) {

            var data_row = data[i];
            var len = w2ui.divTBContainer.records.length;

            var taskType = 1;
            if (data_row[3] == "cosntruct") {
                taskType = 1;
            }
            else {
                taskType = 2;
            }
            var xx = "<a href=\"javascript:void(0);\" onmousedown=\"seeModelItem(" + data_row[4] + ")\" onmouseup=\"resetIsolate();\">" + data_row[5] + "</a>";

            w2ui['divTBContainer'].add({
                recid: len + 1, gridtaskid: len + 1,
                gridtaskname: data_row[0], gridstadate: data_row[1], gridenddate: data_row[2], gridtasktype: taskType, gridmodel: xx
            });

        }
    }

    $("#myInput").change(function (evt) {
        var files = evt.target.files; // FileList object
        var f = files[0];

        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                var contents = e.target.result;
                importTasks(contents);
              
            }
            r.readAsText(f);
        } else {
            alert("Failed to load file");
        }
    });
   

    var playCurrentKeyIndex = 0;
    var playTotalKeyCount = 0;
    var timeHandle = null;
    var globalPlayDic = null;

    function myTimer() { 
        
        var ids = globalPlayDic[keysArray[playCurrentKeyIndex]];

        var currentTime = keysArray[playCurrentKeyIndex];
       
        var myDate = new Date(currentTime);

        var month = myDate.getMonth() + 1;
        //prepare the div content
        var divStr = "<h3>Current Time: </h3>\n<h4>" +
             myDate.getFullYear() + "," + month + "," + myDate.getDate() +
             "</h4>\n<h3>Object Names: </h3>\n";
        
         for (idindex = 0; idindex < ids.length; idindex++) {
                var id = ids[idindex];
                for (i = 0; i < currNodes.length; i++) {
                    var node = currNodes[i];
                    if (node.dbId == parseInt(id)) {
                        showOneNode1(node);
                        divStr += "<h4>" + node.name + "</h4>\n"; 
                    }
                }
         }

         $("#taskdiv")[0].innerHTML = divStr;

            playCurrentKeyIndex++;
            if (playCurrentKeyIndex == playTotalKeyCount) {
                clearInterval(timeHandle);
                //viewer3D.propertygrid.openOnSelect = true;
                w2ui['divTButtons'].enable("btnplay");
                w2ui['divTButtons'].disable("btnpause");
                w2ui['divTButtons'].disable("btnend");

               
                var obj = $("#taskdiv");
                obj.remove();
             
            }
    }

    $('#divTButtons').w2toolbar({
        name: 'divTButtons',
        items: [
            { type: 'button', id: 'btnadd', caption: 'add', img: 'icon-add' },
            { type: 'button', id: 'btndelete', caption: 'delete', img: 'icon-delete' },
            { type: 'button', id: 'btndeleteall', caption: 'delete all', img: 'icon-delete' },
            { type: 'break', id: 'break1' },
            { type: 'button', id: 'btnchoosefile', caption: 'choose file', img: 'icon-folder' },
            { type: 'text', id: 'txttaskfile', caption: 'choose file' },
            { type: 'break', id: 'break2' },
            { type: 'button', id: 'btnplay', caption: 'play', img: 'icon-save' },
            { type: 'button', id: 'btnpause', caption: 'pause', img: 'icon-save',disabled:true },
            { type: 'button', id: 'btnend', caption: 'end', img: 'icon-delete', disabled: true },
             { type: 'spacer'},
            { type: 'button', id: 'btnexistingfile', caption: 'demo file', img: 'icon-save' }

        ],
        onClick: function (event) {
            console.log('item ' + event.target + ' is clicked.');

            if (event.target == 'btnadd') {
                var len = w2ui.divTBContainer.records.length;
                w2ui['divTBContainer'].add({ recid: len + 1, gridtaskid: len + 1, gridtaskname: 'New Task', gridstadate: "1/16/2014", gridenddate: "1/16/2014", gridtasktype: 1, gridmodel: 'attach model item' });
            }
            if (event.target == 'btndeleteall') {
                w2ui.divTBContainer.selectAll();
                w2ui.divTBContainer.delete(true);
            }
            if (event.target == 'btndelete') {
                w2ui.divTBContainer.delete(true); 

            }
            if (event.target == 'btnchoosefile') {
               
                w2ui.divTBContainer.selectAll();
                w2ui.divTBContainer.delete(true);
                 $('#myInput').click();               
            }

            if (event.target == 'btnexistingfile') {
                //
                var demotaskscontent = document.getElementById('ExistingTasks').value;
                demotaskscontent = demotaskscontent.replace(/<br>/g, "\r\n");
                importTasks(demotaskscontent);
            }

            if (event.target == 'btnplay') {
                if (w2ui.divTBContainer.records.length > 0) {

                                
                    var parentdiv = $('<div></div>');         
                    parentdiv.attr('id', 'taskdiv');
                    parentdiv.html("");

                    $(document.body).append(parentdiv);
                    $("#taskdiv")[0].style.position = "absolute";
                    $("#taskdiv")[0].style.left = "20px";
                    $("#taskdiv")[0].style.top = "60px";
                    $("#taskdiv")[0].style.zIndex = 10000;

                    //parentdiv.addclass('parentdiv');   
                    


                    w2ui['divTButtons'].disable('btnplay');
                    w2ui['divTButtons'].enable('btnpause');
                    w2ui['divTButtons'].enable('btnend');
 
                    if (playTotalKeyCount > 0) {
                        timeHandle = setInterval(function () { myTimer() }, 500);
                    }
                    else {

                        //viewer3D.propertygrid.openOnSelect = false;
                        globalPlayDic = getTableData();

                        //isolate all
                        for (i = 0; i < currNodes.length; i++) {
                            var node = currNodes[i];
                            viewer3D.isolateById(node.dbId);
                        }

                        playCurrentKeyIndex = 0;

                        playTotalKeyCount = keysArray.length;
                        timeHandle = setInterval(function () { myTimer() }, 1000);
                    } 

                }
                else {
                    alert("no task!");
                }
            }

            if (event.target == 'btnpause') {
                w2ui['divTButtons'].enable("btnplay");
                w2ui['divTButtons'].disable("btnpause");
                clearInterval(timeHandle);
            }

            if (event.target == 'btnend') {
                
                clearInterval(timeHandle);

                 playCurrentKeyIndex = 0;
                 playTotalKeyCount = 0;
                 timeHandle = null;
                 globalPlayDic = [];
                 keysArray = [];

                // viewer3D.propertygrid.openOnSelect = true;

                w2ui['divTButtons'].enable("btnplay");
                w2ui['divTButtons'].disable("btnpause");
                w2ui['divTButtons'].disable("btnend");

                var obj = $("#taskdiv");
                obj.remove();


                viewer3D.showAll();

            }

        }
    });

    $('#divTBPanel').w2layout({
        name: 'divTBPanel',
        panels: [
            { type: 'top', size: 30, resizable: false, style: pstyle, content: 'top' },
            { type: 'main', style: pstyle, content: 'main' }
        ]
    });


    w2ui['divTBPanel'].content('top', w2ui['divTButtons']);
    w2ui['divTBPanel'].content('main', w2ui['divTBContainer']);

    var pstyleTitle = 'background-color: #F5F6F7; border: 1px solid #dfdfdf; padding: 5px; font-size:xx-large';


    //div layout
    $('#divLayout').w2layout({
        name: 'divLayout',
        panels: [
            { type: 'top', size: 50, resizable: false, style: pstyleTitle, content: '<img src="adskimg.png"/>                   ADN Timeliner Sample' },
            { type: 'main', style: pstyle, content: 'main' },             
            { type: 'right', size: 200, resizable: true, style: pstyle },
            { type: 'bottom', size: 250, resizable: true, style: pstyle }
        ]
    });

    //main div
    w2ui['divLayout'].content('main', '<div id="divViewer" style="height:100%;height:100%"></div>');
    //right div 
    w2ui['divLayout'].content('right', w2ui['divModelPanel']);
    //bittom div 
    w2ui['divLayout'].content('bottom', w2ui['divTBPanel']);
 

    //function initializeViewer() 
    {         
        var documentId = "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bHhkbXl0ZXN0L2dhdGVob3VzZS5ud2Q=";
        var thistoken = document.getElementById('AccessToken').value;
        var options = {
            'document': documentId,
            'accessToken': thistoken,
        
        }; 
 

        Autodesk.Viewing.Initializer(options, function () {
            // Create a Viewer3D 
            var viewer3DContainerDiv = document.getElementById('divViewer');
            viewer3D = new Autodesk.Viewing.BaseViewer3D(viewer3DContainerDiv, {}); 
          
            viewer3D.initialize();

            // Load the document and associate the document with our Viewer3D 
           // Autodesk.Viewing.Document.load(documentId, Autodesk.Viewing.Private.getAuthObject(), onSuccessDocumentLoadCB, onErrorDocumentLoadCB);
           // change acccording to the discussion and update at:
           // http://forums.autodesk.com/t5/View-and-Data-API/Autodesk-Viewing-Document-load-returns-quot-error-quot-quot/td-p/5141276
           Autodesk.Viewing.Document.load(documentId, null, onSuccessDocumentLoadCB, onErrorDocumentLoadCB);

        });
     }

    function onSuccessDocumentLoadCB(viewerDocument) {

        currentViewerDoc = viewerDocument;
        var rootItem = viewerDocument.getRootItem();

        var geometryFilter3d = { 'type': 'geometry', 'role': '3d' };
        //store in globle variable 
        geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(rootItem, geometryFilter3d, true);

        if (geometryItems.length > 0) {

            var item3d = viewerDocument.getViewablePath(geometryItems[0]);

            viewer3D.load(item3d);

            console.log("Loading 3d Geometry from document : " + documentId);

            if (viewer3D != null)
                viewer3D.getObjectTree(getObjectTreeCB);
        }
        else {
            console.log("3d Geometry not found in document : " + documentId);
        }
    }
    function onErrorDocumentLoadCB(viewerDocument) {
    }
 

}(this));