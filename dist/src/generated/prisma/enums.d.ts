export declare const OtpType: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type OtpType = (typeof OtpType)[keyof typeof OtpType];
export declare const CartStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ABANDONED: "ABANDONED";
    readonly CONVERTED: "CONVERTED";
};
export type CartStatus = (typeof CartStatus)[keyof typeof CartStatus];
export declare const RegionType: {
    readonly ADAMAOUA: "ADAMAOUA";
    readonly CENTRE: "CENTRE";
    readonly EST: "EST";
    readonly EXTREME_NORD: "EXTREME_NORD";
    readonly LITTORAL: "LITTORAL";
    readonly NORD: "NORD";
    readonly NORD_OUEST: "NORD_OUEST";
    readonly OUEST: "OUEST";
    readonly SUD: "SUD";
    readonly SUD_OUEST: "SUD_OUEST";
};
export type RegionType = (typeof RegionType)[keyof typeof RegionType];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PREPARING: "PREPARING";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const paymentMethod: {
    readonly ORANGE_MONEY: "ORANGE_MONEY";
    readonly MTN_MOBILE_MONEY: "MTN_MOBILE_MONEY";
    readonly CASH_ON_DELIVERY: "CASH_ON_DELIVERY";
};
export type paymentMethod = (typeof paymentMethod)[keyof typeof paymentMethod];
//# sourceMappingURL=enums.d.ts.map