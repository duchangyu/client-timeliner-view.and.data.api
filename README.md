
#Client sample - timeliner


##Description

*This sample is part of the [Developer-Autodesk/Autodesk-View-and-Data-API-Samples](https://github.com/Developer-Autodesk/autodesk-view-and-data-api-samples) repository.*

A sample simulates Navisworks timeline with Autodesk Viewer



##Dependencies

* Get your consumer key and secret key at https://developer.autodesk.com/
* Use other workflow samples to log in, upload a model file, start translation to get default URN for demo. 
* The demo model is available at  [gatehouse.nwd](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/blob/master/gatehouse.nwd)  
* In Credentials.cs, provide your own API key, secret, default bucket name and default URN string

##Setup/Usage Instructions

* Build the sample and browse to the website with Chrome or Firefox. You may need to clean up cache of browser before running
* The default model will be loaded. object tree is generated.  
* Click any model item to isolate the corresponding object in viewer. click [Show All] to restore.
* In task table:

      * [add] : add a new task. Edit the start date, end date, task type. Select one task item, right click a model item in the model tree, a hyperlink will be generated for the column 
      * [delete] : delete one selected task
      * [delete all] : delete all tasks
      * [choose task data] : load an existing task file on client (currently csv, or txt)
      * [New Model]: load a new model. it allows the user to choose a local model and upload it to view service, and the webpage can display the new model. The user can work with Timeliner with the new model
      * [demo task] : load an existing task file on server. In this case, it is timelinerdata.txt in Content folder. It can only be useful for the demo model[gatehouse.nwd](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/blob/master/gatehouse.nwd). If current model is different, the code will pop out an error message. 
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


