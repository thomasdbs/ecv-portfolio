export const Language = (language) => {

  if (language === 'fr') {

    return {
      see_project:'Voir le projet',
      the_project:'Le projet',
      context:'Contexte',
      year:'Année',
      previous:'Projet précédent',
      next:'Projet suivant',
      works:'Réalisations',
      not_found_text1:'Oups, cette page n\'existe pas !',
      not_found_text2:'Par contre j\'ai plein d\'autres projets super cools à voir',
      not_found_link:'Retour aux projets'
    }

  }else {

    return {
      see_project:'See the project',
      the_project:'The project',
      context:'Context',
      year:'Year',
      previous:'Previous project',
      next:'Next project',
      works:'Works',
      not_found_text1:'Oops, this page doesn\'t exist',
      not_found_text2:'By cons I have many other cool projects to see',
      not_found_link:'Back to projects'
    }

  }

}
