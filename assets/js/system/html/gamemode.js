export function showHide (target)
{
    const infos = document.querySelectorAll('[data-infos]');

    document.querySelector('[data-infos="' +target+ '"]').classList.add('show');

    for (let x = 0; x < infos.length; x++) {
        const closeInfos = infos[x].dataset.infos;
        if (closeInfos === target) continue;

        document.querySelector('[data-infos="' +closeInfos+ '"]').classList.remove('show');
    }
}