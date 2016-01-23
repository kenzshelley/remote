"use strict";

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://cdn.firebase.com/v0/firebase.js";
$("head").append(s);

const ref = new Firebase('https://remote-hound.firebaseio.com/')

let userid = "test_user";
const tasksRef = ref.child("users").child(userid).child("tasks");

function nextTab() {
  // first, get currently active tab
  chrome.tabs.query({active: true}, function (tabs) {
    if (tabs.length) {
      var activeTab = tabs[0],
      tabId = activeTab.id,
      currentIndex = activeTab.index;
      // next, get number of tabs in the window, in order to allow cyclic next
      chrome.tabs.query({currentWindow: true}, function (tabs) {
        var numTabs = tabs.length;
        // finally, get the index of the tab to activate and activate it
        chrome.tabs.query({index: (currentIndex+1) % numTabs}, function (tabs){
          if (tabs.length) {
            var tabToActivate = tabs[0],
            tabToActivate_Id = tabToActivate.id;
            chrome.tabs.update(tabToActivate_Id, {active: true});
          }
        });
      });
    }
  });
}

function newTab() {
    chrome.tabs.create({}, function (tab) {
      console.log(tab);
    });
}

tasksRef.on("value", function(snapshot) {
  let data = snapshot.val();
  for(var id in data) {
    let taskItem = data[id];
    let text = taskItem.text; 
    text = text.toLowerCase();

    // Get array of words
    text = text.split(" ");
    let task = getTaskName(text);
    if (task.name == null) {
      console.log("null task!");
      console.log(text);
      tasksRef.child(id).remove();
      return;
    }

    console.log(task);

    if (task.data.scope === "content") {
      chrome.tabs.getSelected(function(tab) {
        chrome.tabs.sendMessage(tab.id,
                                {function_name: task.name, params: task.params},
                                function(response) {
                                  console.log(response);
                                });
      });
    } else if (task.data.scope === "browser") {
      let fn = window[task.name];
      fn(task.params);
    }

    // Delete the task
    tasksRef.child(id).remove();
  }
});


