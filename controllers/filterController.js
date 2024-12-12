const filterAndSortProducts = async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  } = req.query;

  let filterCriteria = {};

  // Category filter
  if (category) {
    filterCriteria.category = category;
  }

  // Price filter
  if (minPrice || maxPrice) {
    filterCriteria.price = {};
    if (minPrice) {
      filterCriteria.price.$gte = minPrice;
    }
    if (maxPrice) {
      filterCriteria.price.$lte = maxPrice;
    }
  }

  // Rating filter
  if (minRating) {
    filterCriteria.rating = { $gte: minRating };
  }

  let sortCriteria = {};
  if (sortBy) {
    sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  try {
    const startIndex = (page - 1) * limit;
    const products = await Product.find(filterCriteria)
      .sort(sortCriteria)
      .skip(startIndex)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filterCriteria);

    res.status(200).json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  filterAndSortProducts,
};
