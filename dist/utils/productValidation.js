"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.porductValidation = void 0;
const porductValidation = (req, res) => {
    switch (req.body) {
        case !req.body.product_name:
            return res.status(400).json({ message: 'name is required' });
        case !req.body.description:
            return res.status(400).json({ message: 'description is required' });
        case !req.body.price:
            return res.status(400).json({ message: 'price is required' });
        case !req.body.product_image:
            return res.status(400).json({ message: 'product_image is required' });
    }
};
exports.porductValidation = porductValidation;
//# sourceMappingURL=productValidation.js.map