
#Client sample - timeliner


##Description

*This sample is part of the [Developer-Autodesk/Autodesk-View-and-Data-API-Samples](https://github.com/Developer-Autodesk/autodesk-view-and-data-api-samples) repository.*

A sample simulates Navisworks timeline with Autodesk Viewer

##Dependencies

* The "Demo task" of this sample depends on the sample model, it is available at  [gatehouse.nwd](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/blob/master/gatehouse.nwd)  


##Setup/Usage Instructions

* Get your consumer key and secret key at https://developer.autodesk.com/
* With this key pair, use other workflow samples, for example, [this winform workflow sample](https://github.com/Developer-Autodesk/workflow-dotnet-winform-view.and.data.api) to create bucket, upload demo model and get the model translated, and get the models URN for latter usage.
* Open the solution in Visual Studio 2012
* Replace the place holder in Credentials.cs with your own consumer key and secret key, bucket name and URN which are the ones you created in step 2. The URN string should start with "urn:". 
* Build and run the project, browse to the website with Chrome or Firefox. You may need to clean up cache of browser before running. The default model will be loaded. object tree is generated.  
* Click any model item to isolate the corresponding object in viewer. click [Show All] to restore.
* In task table:

      * [add] : add a new task. Edit the start date, end date, task type. Select one task item, right click a model item in the model tree, a hyperlink will be generated for the column 
      * [delete] : delete one selected task
      * [delete all] : delete all tasks
      * [choose task data] : load an existing task file on client (currently csv, or txt)
      * [New Model]: load a new model. it allows the user to choose a local model and upload it to view service, and the web page can display the new model. The user can work with Timeliner with the new model
      * [demo task] : load an existing task file on server. In this case, it is timelinerdata.txt in Content folder. It can only be useful for the demo model [gatehouse.nwd](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/blob/master/gatehouse.nwd). If current model is different, the code will pop out an error message. 
      * [play] : starts a simulation process. Currently, only 'construction' of task type is implemented
      * [Pause]: pause a simulation process
      * [End]:   stop a simulation process

* Simulation uses 'end date' only   
* Simulation implements 'Construct' type only

Please refer to the video [ADN-Viewer-Timeliner.mp4](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/blob/master/ADN-Viewer-Timeliner.mp4) for a demo of the detailed workflow. 

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

##Written by 

Xiaodong Liang


