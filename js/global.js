
/* Menu mobile */

function menuMobile() {
    /*déclariation des constanstes*/
    const btn = document.querySelector('.burger');
    const header = document.querySelector('.header');
    const links = document.querySelectorAll('.navbar a');

    //rajoute un évemenement au click 
    btn.addEventListener('click', () => {
    //ajoute moi la classe show-nav et enlève la moi quand on reclique sur le burger
      header.classList.toggle('show-nav');
    });

    //ferme le menu quand on clique sur un lien
    links.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('show-nav');
      });
    });
  }
  
  menuMobile();

  /* Porfolio */

function tabsFilters() {
    const tabs = document.querySelectorAll('.portfolio-filters a');
    const projets = document.querySelectorAll('.portfolio .card');
  
    //permet de reset le active sur les catégories
    const resetActiveLinks = () => {
        tabs.forEach(elem => {
          elem.classList.remove('active');
        })
      }

    const showProjets = (elem) => {
        console.log(elem);
      projets.forEach(projet =>{

        //récupère le filtre que l'on à créer dans le HTML
        let filter = projet.getAttribute('data-category');

        //trier les catégories avec toutes
        if(elem === 'all') {
            projet.parentNode.classList.remove('hide');
            //permet de ne pas prendre en compte les autres if si la conditions est respectée
            return
        }

        //si le filtre ne correspond pas à la catégorie, on le cache
        if(filter !== elem) {
            //ajoute la classe hide
            projet.parentNode.classList.add('hide');
        } 
        else {
            //enlève la classe hide
            projet.parentNode.classList.remove('hide');
        }
        console.log(projet);
      });
    }

    tabs.forEach(elem =>{
        elem.addEventListener('click', (event) =>{
            event.preventDefault();
            let filter = elem.getAttribute('data-filter');
            console.log(filter);
            showProjets(filter);
            resetActiveLinks();
            elem.classList.add('active');
        });
    })
}

tabsFilters();

function showProjectDetails() {
    const links = document.querySelectorAll('.card-link');
    const modals = document.querySelectorAll('.modal');
    const annexe = document.querySelectorAll('.competencesE4-content a');
    const btns = document.querySelectorAll('.modal-close');

    const hideModals = () => {
        modals.forEach(modal =>{
            modal.classList.remove('show');
        });
    }


    links.forEach(elem => {
        elem.addEventListener('click', (event) =>{
            event.preventDefault();
            document.querySelector(`[id=${elem.dataset.id}]`).classList.add('show');
        });
    });

    //Lors du click sur une carte
    annexe.forEach(element => {
      if(element.hasAttribute('data-id')){
          element.addEventListener('click', (event) => {
              event.preventDefault();
              document.querySelector(`[id=${element.dataset.id}]`).classList.add('show');
          });
      }
  });

    btns.forEach(btn => {
      btn.addEventListener('click', (event) =>{
          hideModals();
      });
  });
}

showProjectDetails();

//Effets

const observerAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');

  //index va compter le nombre d'entrée
  sections.forEach((section, index ) => {
    //permet de ne pas avoir l'animation sur la première section
    if(index === 0) return;
    section.style.opacity = "0";
    section.style.transition = "all 1.6s";
  });

  skills.forEach((elem, index) => {

    elem.style.width = "0";
    elem.style.transition = "all 1.6s";
  });

  //permet de créer l'animation en instanciant
  let sectionObserver = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      //si il est sur l'élément
      if(entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = 1;
        console.log(elem);

      }
    });

  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  let skillsObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.width = elem.dataset.width + '%';
      }
    });
  });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });

}

observerAnimation();