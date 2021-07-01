const formatFruitTrees = (fruitTrees) => {
  return fruitTrees.map((tree) => {
    const {
      id,
      name,
      loc_lat,
      loc_long,
      details,
      image_url,
      create_at,
      user_id,
    } = tree;

    let formatTree = {
      id: id,
      name: name,
      coords: {
        lat: loc_lat,
        lng: loc_long,
      },
      content: name,
      details: details,
      image_url: image_url,
      create_at: create_at,
      user_id: user_id,
    };
    return formatTree;
  });
};

module.exports = formatFruitTrees;
