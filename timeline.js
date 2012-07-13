Timeliner = function() {
  projectsData = null;
  
  // borrowed from RavelryThing
  var $E = function(data) {
      var el;
      if ('string' == typeof data) {
        el = document.createTextNode(data);
      } else {
        el = document.createElement(data.tag);
        delete(data.tag);
        if ('undefined' != typeof data.children) {
          for (var i=0, child=null; 'undefined' != typeof (child=data.children[i]); i++) { if (child) { el.appendChild($E(child)); } }
          delete(data.children);
        }
        for (attr in data) { 
          if (attr == 'style') {
            for (s in data[attr]) {
              el.style[s] =  data[attr][s];
            } 
          } else if (data[attr]) {
            el[attr]=data[attr]; 
          }
        }
      }
      return el;
  };


  return {
    projectsLoaded: function(data) {
      projectsData = data;
    },

    drawTimeline: function(options) {
      var timelineProjects = projectsData.projects;
      
      container = $('timeliner');
      container.appendChild($E({ tag: 'ul', id: 'timeline'}));
      var timeline = $('timeline');
      
      var timelineEvents = [];
      months = ['January','February','March','April','May','June','July','August','September','October','November','December']
      
      for (var i=0; i < timelineProjects.length; i++) {
      
        var project = timelineProjects[i];      
        
        // first, built "cast on" event, if any
        if (project.started) {
          var id = 'event-' + project.started + '-a-' + i;
          var dateParts = project.started.split('-');
          var date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1])-1, parseInt(dateParts[2]))
          var dateNice = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
          
          if (!project.pattern) {
            project.pattern = {}
            project.pattern.name = 'Personal pattern';
            project.pattern.url = project.url;
          }

          // build a blurb of details relevant to starting the project
          var eventData = [
            'Cast on ',
            { tag: 'a', href: project.pattern.url, children: [ project.pattern.name ] }
          ];
          if (project.madeFor) {
            eventData.push(' for ');
            eventData.push({ tag: 'em', children: [ project.madeFor ] });
          }
          // build a list of yarns -- with full API, could be improved by pulling stash items and linking to them or tiling in little thumbnails 
          if (project.yarns) {
            yarns = []
            for (y=0; y<project.yarns.length; y++) {  
              yarns.push(project.yarns[y].brand + ' ' + [project.yarns[y].name]);
            }
            yarns.sort();
            for (y=0; y<yarns.length; y++) { // loop through, dropping any duplicates
              if (yarns[y] == yarns[y+1]) {
                yarns.splice(y,1);
              }
            }
            yarn = yarns.join(' & ');
            eventData.push(' with ');
            eventData.push({ tag: 'em', children: [ yarn ] });
          }
          // add to events list
          timelineEvents.push({
            id: id,
            eventType: 'begin',
            date: dateNice,
            eventData: eventData,
            permalink: project.url
          });
        }
        
        // second, build the "finished" event, if any
        if (project.completed) {
          if (!project.name && project.pattern) { // project hasn't been given a name, but the pattern has one
            project.name = 'Untitled Project (' + project.pattern.name + ')';
          } else if (!project.name) { // personal project with no name
            project.name = 'Untitled Project';
          }
        
          var id = 'event-' + project.completed + '-b-' + i;
          var dateParts = project.completed.split('-');
          var date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1])-1, parseInt(dateParts[2]))
          var dateNice = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
          
          // build a blurb of details relevant to starting the project
          var eventData = [];
          if (project.thumbnail) {
            eventData.push({ tag: 'a', className: 'event_thumb', href: project.url, children: [
              {tag: 'img', src: project.thumbnail.src }
            ]});
          }
          eventData.push('Finished ');
          eventData.push({ tag: 'a', href: project.url, children: [ project.name ] });
          
          timelineEvents.push({
            id: id,
            eventType: 'end',
            date: dateNice,
            eventData: eventData,
            permalink: project.url
          });
        }
      }
      timelineEvents.sort(function(a,b){return a.id > b.id ? -1 : 1;})
      for (i=0; i<timelineEvents.length; i++) {
        e = timelineEvents[i];
        timeline.appendChild($E({
          tag: 'li',
          className: e.eventType,
          id: e.id,
          children: [
            { tag: 'div', className: 'timestamp', children: [ e.date ] },
            { tag: 'p', children: e.eventData },
            { tag: 'a', className: 'permalink', href: e.permalink, children: [ '+' ] },
            { tag: 'div', className: 'branch'}
          ]
        }));
      }
    }
  }
}();