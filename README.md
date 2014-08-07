
#Client sample - timeliner


##Description

*This sample is part of the [Developer-Autodesk/Autodesk-View-and-Data-API-Samples](https://github.com/Developer-Autodesk/autodesk-view-and-data-api-samples) repository.*

A sample simulates Navisworks timeline with Autodesk Viewer



##Dependencies

You need other workflow samples to log in, upload a file, start translation to get required parameters (urn) for viewer

##Setup/Usage Instructions

Program Workflow

* _layout.shtml designs the layout of the page
* Timeliner_new_ui.js implements the layout and workflow   
* HomeController.cs gets the token in server side, and send to client
* Timeliner_new_ui.js loads the prepared model, by the token, displays it
* Get your consumer key and secret key at https://developer.autodesk.com/ 
* Upload a model to viewing service. 

      you can use the demo desktop sample to upload model to get the urn or you can take advantage of the "functions reserved for other workflows" in HomeController.cs


Demo Workflow:

* Build the sample and browse to the website with Chrome or Firefox. You may need to clean up cache of browser before running
* Click [Load Model] to list the model tree
* Click any model item to isolate the corresponding object in viewer 
* In task table:

      * [add] : add a new task. Edit the start date, end date, task type. Select one task item, right click a model item in the model tree, a hyperlink will be generated for the column 
      * [delete] : delete one selected task
      * [delete all] : delete all tasks
      * [choose file] : load an existing task file on client (currently csv, or txt)
      * [demo file] : load an existing task file on server. In this case, it is timelinerdata.txt in Content folder.
      * [play] : starts a simulation process. Currently, only 'construction' of task type is implemented

* Simulation uses 'end date' only   

Please refer to the video [ADN-Viewer-Timeliner.mp4](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/tree/master/Adsk_Viewer_Timeliner_ASP_MVC_Sample/Adsk_Viewer_Timeliner_ASP_MVC_Sample) for a demo of the detailed workflow. 

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

##Written by 

Xiaodong Liang


