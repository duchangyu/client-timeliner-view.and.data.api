
#client-timeliner-view.and.data.api


##Description

*This sample is part of the [Developer-Autodesk/Autodesk-View-and-Data-API-Samples](https://github.com/Developer-Autodesk/autodesk-view-and-data-api-samples) repository.*

A sample simulates Navisworks timeline with Autodesk Viewer



##Dependencies

You need other workflow samples to log in, upload a file, start translation to get required parameters (urn) for viewer

##Setup/Usage Instructions

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

## License

workflow-curl-view.and.data.api is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

##Written by 

Xiaodong Liang


