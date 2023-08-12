"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.getCart = exports.addToCart = void 0;
const db_1 = require("../utils/db");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield db_1.db.cartItem.findUnique({
        where: {
            productId: req.body.productId,
            cart: {
                userId: req.user.id,
            },
        },
    });
    if (cartItem) {
        const cartItemToUpdate = yield db_1.db.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity: cartItem.quantity + 1,
            },
        });
        return res.json({ cartItem: cartItemToUpdate });
    }
    const cartItemToCreate = yield db_1.db.cartItem.create({
        data: {
            quantity: 1,
            product: {
                connect: {
                    id: req.body.productId,
                },
            },
            cart: {
                connect: {
                    userId: req.query.userId,
                },
            },
        },
    });
    res.json({ cartItem: cartItemToCreate });
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield db_1.db.cart.findUnique({
        where: {
            userId: req.params.userId,
        },
        include: {
            cartItems: {
                include: {
                    product: true,
                },
            },
        },
    });
    res.json({ cart });
});
exports.getCart = getCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield db_1.db.user.findUnique({
        where: {
            id: req.params.userId,
        },
    });
    if (!findUser) {
        return res.status(400).json({
            message: 'user not found',
        });
    }
    const cart = yield db_1.db.cartItem.findUnique({
        where: {
            id: req.params.cartId,
        },
    });
    if (!cart) {
        return res.status(400).json({
            message: 'cart not found',
        });
    }
    const deleteCart = yield db_1.db.cartItem.delete({
        where: {
            id: req.params.cartId,
        },
    });
    res.json({ deleteCart });
});
exports.deleteCart = deleteCart;
//# sourceMappingURL=cart.js.map