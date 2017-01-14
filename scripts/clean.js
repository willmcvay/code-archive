const del   = require( 'del' );
const items = [ 'public/**' ];

items.forEach( ( toDelete, index, array ) => {
  del( [ toDelete ] ).then(
    (paths) => {
      if(paths.length > 0)
        console.log( `${toDelete} successfully removed` );
      else
        console.log( `Error while deleting ${toDelete}` );
    }
  )
});
