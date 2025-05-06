const Product = require("../model/productSchema");

const getAllProducts = async (req, res) => {
    try {
        const { company, name, featured ,sort , select } = req.query;
        const queryObject = {};

        if (company) {
            queryObject.company = company;
        }

        if (featured) {
            queryObject.featured = featured === "true";
        }

        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }

        let apiData = Product.find(queryObject);

        if (sort) {
            let sortFix = sort.split(",").join(" ");
            apiData = apiData.sort(sortFix);
        }

        if (select) {
            // let selectFix = select.replace(",", " ")
            let selectFix = select.split(",").join(" ");
            apiData = apiData.select(selectFix);
        }

        //FOR PAGINATION 
        let page = Number(req.query.page) || 1;                     
        let limit = Number(req.query.limit) || 2;

        let skip = (page - 1) * limit;

        apiData = apiData.skip(skip).limit(limit);

        const products = await apiData;
         res.status(200).json({
            nbHits: products.length,
            page,
            limit,
            products,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// const getAllProductsTesting = async (req, res) => {
//     try {
//         // const products = await Product.find(req.query).sort("name -price");
//         //sort=name,price
//         const products = await Product.find(req.query);
//         console.log(req.query);
//         //select=name,company
//         res.status(200).json({ products });
//     } catch (error) {
//         res.status(500).json({ message: "Testing route error", error });
//     }
// };
const getAllProductsTesting = async (req, res) => {
    try {
        const products = await Product.find(req.query);
        console.log(req.query);
        res.status(200).json({ nbHits: products.length, products });
    } catch (error) {
        res.status(500).json({ message: "Testing route error", error });
    }
};

module.exports = { getAllProducts, getAllProductsTesting };
