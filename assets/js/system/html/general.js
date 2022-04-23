export function flash (message, type = 'danger')
{
    const el = `
        <div id="flash" class="${type}">
            ${message}
        </div>
    `;

    addElement(main, el);

    setTimeout(() => {
        if (document.getElementById('flash')) document.getElementById('flash').remove();
    }, 2000);
}

export function addElement (target, el, position = 'beforeend')
{
    target.insertAdjacentHTML(position, el);
}

export function loadPage (page)
{
    return fetch('assets/pages/' +page+ '.html').then(res => res.text());
}

export function btnBack (text = 'retour')
{
    const el = `
        <div id="back">
            <p>${text}</p>
        </div>
    `;

    addElement(main.children[0], el, 'afterbegin');
    addElement(document.getElementById('back'), arrowSVG);
}