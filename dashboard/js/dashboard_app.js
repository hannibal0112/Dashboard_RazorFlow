// Welcome to the RazorFlow Dashbord Quickstart. Simply copy this "dashboard_quickstart"
// to somewhere in your computer/web-server to have a dashboard ready to use.
// This is a great way to get started with RazorFlow with minimal time in setup.
// However, once you're ready to go into deployment consult our documentation on tips for how to 
// maintain the most stable and secure 

StandaloneDashboard(function(db){

	db.setTabbedDashboardTitle ("My Dashboard");

	var db1 = new Dashboard();
	projectModel(db1,"TYGH"); //(Component,ProjectNmae)

	 var db2 = new Dashboard();
	 projectModel(db2,"BABY"); //(Component,ProjectNmae)


	db.addDashboardTab(db1, {
        title: 'TYGH project',
        active: true
    });
    db.addDashboardTab(db2, {
        title: 'Baby project',
        //active: true
    });

},{tabbed: true});


function projectModel(Component,ProjectNmae) {
	/** Show Pie chart  **/
	var priority = new ChartComponent();
	Component.addComponent (priority);
	pieChar(priority,"Priority","http://10.116.136.13:8080/"+ProjectNmae+"/Priority"); //(Component,CaptionNmae,Link)
	/** Show Pie chart  **/
	var status = new ChartComponent();
	Component.addComponent (status);
	pieChar(status,"Status","http://10.116.136.13:8080/"+ProjectNmae+"/Resolution"); //(Component,CaptionNmae,Link)
	/** Show Pie chart  **/
	var resolution = new ChartComponent();
	Component.addComponent (resolution);
	pieChar(resolution,"Resolution","http://10.116.136.13:8080/"+ProjectNmae+"/Status"); //(Component,CaptionNmae,Link)

	/** Show Stacked Column chart  **/
	if(ProjectNmae == "TYGH"){
  //   	var issue_status_APP = new ChartComponent();
		// Component.addComponent (issue_status_APP);
		// issue_status_APP.setDimensions (6, 4);
		// stackedColumnChar(issue_status_APP,"Issue_status_APP","http://10.116.136.13:8080/"+ProjectNmae+"/DiffVersionAPP");

		// var issue_status_WEB = new ChartComponent();
		// Component.addComponent (issue_status_WEB);
		// issue_status_WEB.setDimensions (6, 4);
		// stackedColumnChar(issue_status_WEB,"Issue_status_WEB","http://10.116.136.13:8080/"+ProjectNmae+"/DiffVersionWEB");
   
   		var so_far_status_APP = new ChartComponent();
    	so_far_status_APP.setDimensions (12, 4);
		Component.addComponent (so_far_status_APP);
		stackedColumnChar(so_far_status_APP,"JIRA issue status in diff. versions_APP","http://10.116.136.13:8080/"+ProjectNmae+"/DiffVersionSoFarAPP");

		var so_far_status_WEB = new ChartComponent();
    	so_far_status_WEB.setDimensions (12, 4);
		Component.addComponent (so_far_status_WEB);
		stackedColumnChar(so_far_status_WEB,"JIRA issue status in diff. versions_WEB","http://10.116.136.13:8080/"+ProjectNmae+"/DiffVersionSoFarWEB");

		/** Show Line chart  **/
	    var daily_status = new ChartComponent();
		Component.addComponent (daily_status);
		LineChar("TYGH",daily_status,"JIRA issue remain by time(Daily)","http://10.116.136.13:8080/"+ProjectNmae+"/TYGHDiffDate");
    }else if(ProjectNmae == "BABY"){
  //   	var issue_status = new ChartComponent();
  //   	issue_status.setDimensions (6, 4);
		// Component.addComponent (issue_status);
		// stackedColumnChar(issue_status,"Issue_status","http://10.116.136.13:8080/"+ProjectNmae+"/DiffVersion");

		var so_far_status = new ChartComponent();
    	so_far_status.setDimensions (12, 4);
		Component.addComponent (so_far_status);
		stackedColumnChar(so_far_status,"JIRA issue status in diff. versions","http://10.116.136.13:8080/"+ProjectNmae+"/DiffVersionSoFar");
    
		/** Show Line chart  **/
	    var daily_status = new ChartComponent();
		Component.addComponent (daily_status);
		LineChar("BABY",daily_status,"JIRA issue remain by time(Daily)","http://10.116.136.13:8080/"+ProjectNmae+"/DiffDate");
    }
    
	

	// var weekly_status = new ChartComponent();
	// Component.addComponent (weekly_status);
	// LineChar(weekly_status,"Version_status(Weekly)","http://10.116.136.13:8080/"+ProjectNmae+"/WeekRemain");
}

function pieChar(Component,CaptionName,AddrLink) {
    
    Component.setCaption(CaptionName);
	Component.setDimensions (3, 3);
	Component.lock ();	
	
	
	var collectData = [];	
	$.get(AddrLink, function (data) {
		Component.setLabels (data['Name']); // You can also use data.categories
        Component.addSeries (CaptionName, "items", data['RemainCounter'],{
        	seriesDisplayType: 'pie',
        	numberFormatFlag: true, 
        	numberDecimalPoints: 2,
        	//dataType: "number",
        	//numberHumanize: false, 
        	//numberForceDecimals: false,
        	//seriesStacked : true,
        	//seriesHiddenFlag: true
        	numberSuffix: "%"
        });

        /*
        for(i=0; i< data['Name'].length ;i++ )
 		{
 			
			Component.addComponentKPI (CaptionName+"_"+i, {
        	caption: data['Name'][i],
        	value: data['RemainCounter'][i],
        	//numberPrefix: " $",
        	numberDecimalPoints: 2,
        	numberHumanize: true
    		});
 		}
 		*/
       
		
        // Don't forget to call unlock or the data won't be displayed
        Component.unlock ();
	});
}

function stackedColumnChar(Component,CaptionName,AddrLink) {
    
    Component.setCaption(CaptionName);
	Component.lock ();	
	
	$.get(AddrLink, function (data) {
	// $.get("http://10.116.136.13:8080/lookup/BABY", function (data) {
		Component.setLabels (data['Name']); // You can also use data.categories
        Component.addSeries ("Create", "Create", data['CreateCounter'],{
        	seriesStacked: true
			

        });
        Component.addSeries ("Close", "Close", data['CloseCounter'],{
        	seriesStacked: true

        });

        Component.addSeries ("Remain", "Remain", data['RemainCounter'],{
        	seriesStacked: true

        });

        // Don't forget to call unlock or the data won't be displayed
        Component.unlock ();
	});
}

function LineChar(ProjectNmae,Component,CaptionName,AddrLink) {
    
    Component.setCaption(CaptionName);
	Component.setDimensions (12, 4);
	Component.lock ();	
	
	if(ProjectNmae == "TYGH"){
		$.get(AddrLink, function (data) {
			
			Component.setLabels (data[0]['Name']); // You can also use data.categories

	        // Component.addSeries ("Create", "Create", data['CreateCounter'],{
	        // 	seriesDisplayType: "line",
	        // 	//seriesColor: "a4c9f3",	

	        // });
	        // Component.addSeries ("Close", "Close", data['CloseCounter'],{
	        // 	seriesDisplayType: "line",

	        // });

	        Component.addSeries ("APP", "APP", data[0]['RemainCounter'],{
	        	seriesDisplayType: "line"

	        });
	        Component.addSeries ("WEB", "WEB", data[1]['RemainCounter'],{
	        	seriesDisplayType: "line"

	        });
	        // Don't forget to call unlock or the data won't be displayed
	        Component.unlock ();
		});
	}else if (ProjectNmae == "BABY"){
			$.get(AddrLink, function (data) {
			
			Component.setLabels (data['Name']); // You can also use data.categories

	        // Component.addSeries ("Create", "Create", data['CreateCounter'],{
	        // 	seriesDisplayType: "line",
	        // 	//seriesColor: "a4c9f3",	

	        // });
	        // Component.addSeries ("Close", "Close", data['CloseCounter'],{
	        // 	seriesDisplayType: "line",

	        // });

	        Component.addSeries ("APP", "APP", data['RemainCounter'],{
	        	seriesDisplayType: "line"

	        });
	       
	        // Don't forget to call unlock or the data won't be displayed
	        Component.unlock ();
		});
	}
}







