function sortByFirstName (a, b) {
  let aText = a.querySelector("button[role='option']").title
  let bText = b.querySelector("button[role='option']").title
  return aText.localeCompare(bText);
}

function sortCalendarGroup (calendarGroup) {
  let calendarGroupTitle = calendarGroup.previousSibling.querySelector("button[id^='calendar']").title;
  console.log('Sorting calendar group: ' + calendarGroupTitle);

  [...calendarGroup.children]
    .sort(sortByFirstName)
    .forEach((node) => {
      calendarGroup.append(node);
    });
  console.log('Successfully sorted ' + calendarGroupTitle);
}

let lastSorted = false;

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        if ((lastSorted.valueOf() + 5 * 1000) > new Date()) {
          return;
        }

        let calendarGroups = document.querySelectorAll("[role='listbox']");
        if (calendarGroups.length > 0) {
          for (let i = 0; i < calendarGroups.length; i++) {
            let calendarGroup = calendarGroups.item(i);
            sortCalendarGroup(calendarGroup);
          }
          lastSorted = new Date();
        }
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

document.onkeydown = function(evt) {
  let activeElement = document.activeElement;
  const inputs = ['input', 'textarea'];

  if (activeElement && (
    inputs.includes(activeElement.tagName.toLowerCase())
    || activeElement.getAttribute('role') === 'textbox')
  ) {
    return;
  }

  const selectors = {
    74: '[data-icon-name="Forward"]', // j
    75: '[data-icon-name="Back"]', // k
    84: 'button[name="Today"]', // t
  };

  evt = evt || window.event;

  if (selectors[evt.keyCode]) {
    document.querySelector(selectors[evt.keyCode]).click();
  }
};
