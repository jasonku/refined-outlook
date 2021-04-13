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

function isCalendarNavContainer (node) {
  let children = node.children;
  return (children[1] && children[1].getAttribute('data-skip-link-name') === 'Jump to date selection') &&
    (children[2] && children[2].getAttribute('data-skip-link-name') === 'Jump to calendar list');
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        if (newNode.classList.contains(classNameForCalendarNav) || isCalendarNavContainer) {
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
