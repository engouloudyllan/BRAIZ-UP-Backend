import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly Otp: "Otp";
    readonly UserHasRoles: "UserHasRoles";
    readonly Role: "Role";
    readonly RoleHasPermissions: "RoleHasPermissions";
    readonly Permission: "Permission";
    readonly Cart: "Cart";
    readonly CartItem: "CartItem";
    readonly Product: "Product";
    readonly Category: "Category";
    readonly GlobalSettings: "GlobalSettings";
    readonly ShippingZone: "ShippingZone";
    readonly Address: "Address";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly userName: "userName";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly phoneNumber: "phoneNumber";
    readonly profileImage: "profileImage";
    readonly isActive: "isActive";
    readonly isVerified: "isVerified";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly token: "token";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const OtpScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly type: "type";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OtpScalarFieldEnum = (typeof OtpScalarFieldEnum)[keyof typeof OtpScalarFieldEnum];
export declare const UserHasRolesScalarFieldEnum: {
    readonly userId: "userId";
    readonly roleId: "roleId";
};
export type UserHasRolesScalarFieldEnum = (typeof UserHasRolesScalarFieldEnum)[keyof typeof UserHasRolesScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const RoleHasPermissionsScalarFieldEnum: {
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
};
export type RoleHasPermissionsScalarFieldEnum = (typeof RoleHasPermissionsScalarFieldEnum)[keyof typeof RoleHasPermissionsScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly status: "status";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly productId: "productId";
    readonly cartId: "cartId";
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly images: "images";
    readonly price: "price";
    readonly stock: "stock";
    readonly cookingDuration: "cookingDuration";
    readonly isAvailable: "isAvailable";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly categoryId: "categoryId";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly image: "image";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const GlobalSettingsScalarFieldEnum: {
    readonly id: "id";
    readonly companyName: "companyName";
    readonly companyAddress: "companyAddress";
    readonly logo: "logo";
    readonly companyEmail: "companyEmail";
    readonly companyPhone: "companyPhone";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GlobalSettingsScalarFieldEnum = (typeof GlobalSettingsScalarFieldEnum)[keyof typeof GlobalSettingsScalarFieldEnum];
export declare const ShippingZoneScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly region: "region";
    readonly fee: "fee";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ShippingZoneScalarFieldEnum = (typeof ShippingZoneScalarFieldEnum)[keyof typeof ShippingZoneScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly street: "street";
    readonly details: "details";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly shippingZoneId: "shippingZoneId";
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly totalProducts: "totalProducts";
    readonly shippingFee: "shippingFee";
    readonly shippingAddress: "shippingAddress";
    readonly paymentProofUrl: "paymentProofUrl";
    readonly totalAmount: "totalAmount";
    readonly isDeliveryRequested: "isDeliveryRequested";
    readonly status: "status";
    readonly paymentMethod: "paymentMethod";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly shippingZoneId: "shippingZoneId";
    readonly AddressId: "AddressId";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly productId: "productId";
    readonly orderId: "orderId";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly email: "email";
    readonly password: "password";
    readonly userName: "userName";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly phoneNumber: "phoneNumber";
    readonly profileImage: "profileImage";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const SessionOrderByRelevanceFieldEnum: {
    readonly token: "token";
};
export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum];
export declare const OtpOrderByRelevanceFieldEnum: {
    readonly code: "code";
};
export type OtpOrderByRelevanceFieldEnum = (typeof OtpOrderByRelevanceFieldEnum)[keyof typeof OtpOrderByRelevanceFieldEnum];
export declare const RoleOrderByRelevanceFieldEnum: {
    readonly title: "title";
    readonly description: "description";
};
export type RoleOrderByRelevanceFieldEnum = (typeof RoleOrderByRelevanceFieldEnum)[keyof typeof RoleOrderByRelevanceFieldEnum];
export declare const PermissionOrderByRelevanceFieldEnum: {
    readonly title: "title";
    readonly description: "description";
};
export type PermissionOrderByRelevanceFieldEnum = (typeof PermissionOrderByRelevanceFieldEnum)[keyof typeof PermissionOrderByRelevanceFieldEnum];
export declare const CartOrderByRelevanceFieldEnum: {
    readonly sessionId: "sessionId";
};
export type CartOrderByRelevanceFieldEnum = (typeof CartOrderByRelevanceFieldEnum)[keyof typeof CartOrderByRelevanceFieldEnum];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const ProductOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly description: "description";
};
export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum];
export declare const CategoryOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly description: "description";
    readonly image: "image";
};
export type CategoryOrderByRelevanceFieldEnum = (typeof CategoryOrderByRelevanceFieldEnum)[keyof typeof CategoryOrderByRelevanceFieldEnum];
export declare const GlobalSettingsOrderByRelevanceFieldEnum: {
    readonly companyName: "companyName";
    readonly companyAddress: "companyAddress";
    readonly logo: "logo";
    readonly companyEmail: "companyEmail";
    readonly companyPhone: "companyPhone";
};
export type GlobalSettingsOrderByRelevanceFieldEnum = (typeof GlobalSettingsOrderByRelevanceFieldEnum)[keyof typeof GlobalSettingsOrderByRelevanceFieldEnum];
export declare const ShippingZoneOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly description: "description";
};
export type ShippingZoneOrderByRelevanceFieldEnum = (typeof ShippingZoneOrderByRelevanceFieldEnum)[keyof typeof ShippingZoneOrderByRelevanceFieldEnum];
export declare const AddressOrderByRelevanceFieldEnum: {
    readonly title: "title";
    readonly street: "street";
    readonly details: "details";
};
export type AddressOrderByRelevanceFieldEnum = (typeof AddressOrderByRelevanceFieldEnum)[keyof typeof AddressOrderByRelevanceFieldEnum];
export declare const OrderOrderByRelevanceFieldEnum: {
    readonly shippingAddress: "shippingAddress";
    readonly paymentProofUrl: "paymentProofUrl";
};
export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map