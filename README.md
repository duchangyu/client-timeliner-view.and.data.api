
#Client sample - timeliner


##Description

*This sample is part of the [Developer-Autodesk/Autodesk-View-and-Data-API-Samples](https://github.com/Developer-Autodesk/autodesk-view-and-data-api-samples) repository.*

A sample simulates Navisworks timeline with Autodesk Viewer



##Dependencies

You have the choice to use other workflow samples to log in, upload a file, start translation to get required parameters (urn) for viewer, or use [New Model]in the sample to upload a model.

##Setup/Usage Instructions

You can use the demo desktop sample to upload model to get the urn or take advantage of the "functions reserved for other workflows" in HomeController.cs

* Get your consumer key and secret key at https://developer.autodesk.com/ 
* Upload a model to viewing service to prepare a default URN for demo. 
* In web.config, provide your own API key, secret, bucket name and default URN string
* Build the sample and browse to the website with Chrome or Firefox. You may need to clean up cache of browser before running
* The default model will be loaded. object tree is generated.  
* Click any model item to isolate the corresponding object in viewer. click [Show All] to restore.
* In task table:

      * [add] : add a new task. Edit the start date, end date, task type. Select one task item, right click a model item in the model tree, a hyperlink will be generated for the column 
      * [delete] : delete one selected task
      * [delete all] : delete all tasks
      * [choose task data] : load an existing task file on client (currently csv, or txt)
      * [New Model]: load a new model
      * [demo task] : load an existing task file on server. In this case, it is timelinerdata.txt in Content folder.
      * [play] : starts a simulation process. Currently, only 'construction' of task type is implemented

* Simulation uses 'end date' only   
* Simulation implements Construct type only

Please refer to the video [ADN-Viewer-Timeliner.mp4](https://github.com/Developer-Autodesk/client-timeliner-view.and.data.api/blob/master/ADN-Viewer-Timeliner.mp4) for a demo of the detailed workflow. 

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

##Written by 

Xiaodong Liang


