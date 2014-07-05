viewer.client-view.and.data.api-Timeliner
=========================================

A sample simulate Navisworks timeline with Autodesk Viewer

Copyright (c) Autodesk, Inc. All rights reserved
Autodesk Developer Network (ADN)
Permission to use, copy, modify, and distribute this software in object code form for any purpose and without fee is hereby granted, provided that the above copyright notice appears in all copies and that both that copyright notice and the limited warranty and restricted rights notice below appear in all supporting documentation.

AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS. AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE. AUTODESK, INC. DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE UNINTERRUPTED OR ERROR FREE.

Program Workflow

. _layout.shtml designs the layout of the page
. Timeliner_new_ui.js implements the layout and workflow   
. HomeController.cs gets the token in server side, and send to client
. Timeliner_new_ui.js loads the prepared model, by the token, displays it

. presumption: register your api key and secret at https://developer.autodesk.com/ 
. upload a model to viewing service. 
     . you can use the demo desktop sample to upload model to get the urn
     . or you can take advantage of the "functions reserved for other workflows" in HomeController.cs


Demo Workflow:

. Build the sample and deploy it to a website or localhost
. open the website. wait a moment. The model will be displayed. You may need to clean up the cache of the browser before running
. after the model is displayed. Click [Load Model]. The model tree will be listed
. click any model item, the corresponding object in the viewer will be isolated. 
. in the task table:
 [add] can add a new task. Edit the start date, end date, task type. 
 Select one task item, right click a model item in the model tree, a hyperlink will be generated for the column 
 [delete] can delete one selected task
 [delete all] can delete all tasks
 [choose file] can load an existing task file on client (currently csv, or txt)
 [demo file] will load an existing task file on server. In this case, it is timelinerdata.txt in Content.
 [play] starts a simulation. Currently, only 'construction' of task type is implemented. 'demolish' been implemented
Simulation uses 'end date' only   

the video ADN-Viewer-Timeliner.mp4 demos the detailed workflow. 

By Xiaodong Liang, Autodesk

