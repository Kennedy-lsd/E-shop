import ShoesModel from "../models/products/shoesModel.mjs";

const getShoes = async (req, res) => {
    try {
        const shoes = await ShoesModel.find()
        if (!shoes) {
            res.status(404).json({message: "Not found"})
        }
        res.status(200).json(shoes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
}

export default getShoes