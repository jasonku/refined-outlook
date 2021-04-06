const classNameForCalendarNav = '_138FTgA2Ie9lBtUfSPO3oo';
const classNameForCalendarGroup = '_2gSeM2gSuPwpLSuXu-JTNN';
const classNameForCalendar = '_3ekss_cnVypTPOhuHI8v5_';
const classNameForCalendarLabel = 'zMCyxcb5betAk-qUwl3tS';

function sortByFirstName (a, b) {
  let aText = a.getElementsByClassName(classNameForCalendarLabel)[0].textContent;
  let bText = b.getElementsByClassName(classNameForCalendarLabel)[0].textContent;
  return aText.localeCompare(bText);
}

function sortCalendarGroup (calendarGroup) {
  [...calendarGroup.children]
    .sort(sortByFirstName)
    .forEach((node) => {
      calendarGroup.append(node);
    });
}

function sortCalendarGroups (calendarNav) {
  let calendarGroups = calendarNav.getElementsByClassName(classNameForCalendarGroup);

  for (var i = 0; i < calendarGroups.length; i++) {
    sortCalendarGroup(calendarGroups.item(i));
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        if (newNode.classList.contains(classNameForCalendarNav)) {
          console.log('Sorting calendar lists...');
          sortCalendarGroups(newNode);
        }
        replaceText(newNode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
