import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model UserHasRoles
 *
 */
export type UserHasRolesModel = runtime.Types.Result.DefaultSelection<Prisma.$UserHasRolesPayload>;
export type AggregateUserHasRoles = {
    _count: UserHasRolesCountAggregateOutputType | null;
    _avg: UserHasRolesAvgAggregateOutputType | null;
    _sum: UserHasRolesSumAggregateOutputType | null;
    _min: UserHasRolesMinAggregateOutputType | null;
    _max: UserHasRolesMaxAggregateOutputType | null;
};
export type UserHasRolesAvgAggregateOutputType = {
    userId: number | null;
    roleId: number | null;
};
export type UserHasRolesSumAggregateOutputType = {
    userId: number | null;
    roleId: number | null;
};
export type UserHasRolesMinAggregateOutputType = {
    userId: number | null;
    roleId: number | null;
};
export type UserHasRolesMaxAggregateOutputType = {
    userId: number | null;
    roleId: number | null;
};
export type UserHasRolesCountAggregateOutputType = {
    userId: number;
    roleId: number;
    _all: number;
};
export type UserHasRolesAvgAggregateInputType = {
    userId?: true;
    roleId?: true;
};
export type UserHasRolesSumAggregateInputType = {
    userId?: true;
    roleId?: true;
};
export type UserHasRolesMinAggregateInputType = {
    userId?: true;
    roleId?: true;
};
export type UserHasRolesMaxAggregateInputType = {
    userId?: true;
    roleId?: true;
};
export type UserHasRolesCountAggregateInputType = {
    userId?: true;
    roleId?: true;
    _all?: true;
};
export type UserHasRolesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserHasRoles to aggregate.
     */
    where?: Prisma.UserHasRolesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: Prisma.UserHasRolesOrderByWithRelationInput | Prisma.UserHasRolesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserHasRolesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserHasRoles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserHasRoles
    **/
    _count?: true | UserHasRolesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserHasRolesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserHasRolesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserHasRolesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserHasRolesMaxAggregateInputType;
};
export type GetUserHasRolesAggregateType<T extends UserHasRolesAggregateArgs> = {
    [P in keyof T & keyof AggregateUserHasRoles]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserHasRoles[P]> : Prisma.GetScalarType<T[P], AggregateUserHasRoles[P]>;
};
export type UserHasRolesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserHasRolesWhereInput;
    orderBy?: Prisma.UserHasRolesOrderByWithAggregationInput | Prisma.UserHasRolesOrderByWithAggregationInput[];
    by: Prisma.UserHasRolesScalarFieldEnum[] | Prisma.UserHasRolesScalarFieldEnum;
    having?: Prisma.UserHasRolesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserHasRolesCountAggregateInputType | true;
    _avg?: UserHasRolesAvgAggregateInputType;
    _sum?: UserHasRolesSumAggregateInputType;
    _min?: UserHasRolesMinAggregateInputType;
    _max?: UserHasRolesMaxAggregateInputType;
};
export type UserHasRolesGroupByOutputType = {
    userId: number;
    roleId: number;
    _count: UserHasRolesCountAggregateOutputType | null;
    _avg: UserHasRolesAvgAggregateOutputType | null;
    _sum: UserHasRolesSumAggregateOutputType | null;
    _min: UserHasRolesMinAggregateOutputType | null;
    _max: UserHasRolesMaxAggregateOutputType | null;
};
export type GetUserHasRolesGroupByPayload<T extends UserHasRolesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserHasRolesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserHasRolesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserHasRolesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserHasRolesGroupByOutputType[P]>;
}>>;
export type UserHasRolesWhereInput = {
    AND?: Prisma.UserHasRolesWhereInput | Prisma.UserHasRolesWhereInput[];
    OR?: Prisma.UserHasRolesWhereInput[];
    NOT?: Prisma.UserHasRolesWhereInput | Prisma.UserHasRolesWhereInput[];
    userId?: Prisma.IntFilter<"UserHasRoles"> | number;
    roleId?: Prisma.IntFilter<"UserHasRoles"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
};
export type UserHasRolesOrderByWithRelationInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    role?: Prisma.RoleOrderByWithRelationInput;
};
export type UserHasRolesWhereUniqueInput = Prisma.AtLeast<{
    userId_roleId?: Prisma.UserHasRolesUserIdRoleIdCompoundUniqueInput;
    AND?: Prisma.UserHasRolesWhereInput | Prisma.UserHasRolesWhereInput[];
    OR?: Prisma.UserHasRolesWhereInput[];
    NOT?: Prisma.UserHasRolesWhereInput | Prisma.UserHasRolesWhereInput[];
    userId?: Prisma.IntFilter<"UserHasRoles"> | number;
    roleId?: Prisma.IntFilter<"UserHasRoles"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
}, "userId_roleId">;
export type UserHasRolesOrderByWithAggregationInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
    _count?: Prisma.UserHasRolesCountOrderByAggregateInput;
    _avg?: Prisma.UserHasRolesAvgOrderByAggregateInput;
    _max?: Prisma.UserHasRolesMaxOrderByAggregateInput;
    _min?: Prisma.UserHasRolesMinOrderByAggregateInput;
    _sum?: Prisma.UserHasRolesSumOrderByAggregateInput;
};
export type UserHasRolesScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserHasRolesScalarWhereWithAggregatesInput | Prisma.UserHasRolesScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserHasRolesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserHasRolesScalarWhereWithAggregatesInput | Prisma.UserHasRolesScalarWhereWithAggregatesInput[];
    userId?: Prisma.IntWithAggregatesFilter<"UserHasRoles"> | number;
    roleId?: Prisma.IntWithAggregatesFilter<"UserHasRoles"> | number;
};
export type UserHasRolesCreateInput = {
    user: Prisma.UserCreateNestedOneWithoutRolesInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
};
export type UserHasRolesUncheckedCreateInput = {
    userId: number;
    roleId: number;
};
export type UserHasRolesUpdateInput = {
    user?: Prisma.UserUpdateOneRequiredWithoutRolesNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserHasRolesUncheckedUpdateInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserHasRolesCreateManyInput = {
    userId: number;
    roleId: number;
};
export type UserHasRolesUpdateManyMutationInput = {};
export type UserHasRolesUncheckedUpdateManyInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserHasRolesListRelationFilter = {
    every?: Prisma.UserHasRolesWhereInput;
    some?: Prisma.UserHasRolesWhereInput;
    none?: Prisma.UserHasRolesWhereInput;
};
export type UserHasRolesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserHasRolesUserIdRoleIdCompoundUniqueInput = {
    userId: number;
    roleId: number;
};
export type UserHasRolesCountOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type UserHasRolesAvgOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type UserHasRolesMaxOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type UserHasRolesMinOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type UserHasRolesSumOrderByAggregateInput = {
    userId?: Prisma.SortOrder;
    roleId?: Prisma.SortOrder;
};
export type UserHasRolesCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutUserInput, Prisma.UserHasRolesUncheckedCreateWithoutUserInput> | Prisma.UserHasRolesCreateWithoutUserInput[] | Prisma.UserHasRolesUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutUserInput | Prisma.UserHasRolesCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserHasRolesCreateManyUserInputEnvelope;
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
};
export type UserHasRolesUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutUserInput, Prisma.UserHasRolesUncheckedCreateWithoutUserInput> | Prisma.UserHasRolesCreateWithoutUserInput[] | Prisma.UserHasRolesUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutUserInput | Prisma.UserHasRolesCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserHasRolesCreateManyUserInputEnvelope;
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
};
export type UserHasRolesUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutUserInput, Prisma.UserHasRolesUncheckedCreateWithoutUserInput> | Prisma.UserHasRolesCreateWithoutUserInput[] | Prisma.UserHasRolesUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutUserInput | Prisma.UserHasRolesCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserHasRolesUpsertWithWhereUniqueWithoutUserInput | Prisma.UserHasRolesUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserHasRolesCreateManyUserInputEnvelope;
    set?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    disconnect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    delete?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    update?: Prisma.UserHasRolesUpdateWithWhereUniqueWithoutUserInput | Prisma.UserHasRolesUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserHasRolesUpdateManyWithWhereWithoutUserInput | Prisma.UserHasRolesUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserHasRolesScalarWhereInput | Prisma.UserHasRolesScalarWhereInput[];
};
export type UserHasRolesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutUserInput, Prisma.UserHasRolesUncheckedCreateWithoutUserInput> | Prisma.UserHasRolesCreateWithoutUserInput[] | Prisma.UserHasRolesUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutUserInput | Prisma.UserHasRolesCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserHasRolesUpsertWithWhereUniqueWithoutUserInput | Prisma.UserHasRolesUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserHasRolesCreateManyUserInputEnvelope;
    set?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    disconnect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    delete?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    update?: Prisma.UserHasRolesUpdateWithWhereUniqueWithoutUserInput | Prisma.UserHasRolesUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserHasRolesUpdateManyWithWhereWithoutUserInput | Prisma.UserHasRolesUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserHasRolesScalarWhereInput | Prisma.UserHasRolesScalarWhereInput[];
};
export type UserHasRolesCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutRoleInput, Prisma.UserHasRolesUncheckedCreateWithoutRoleInput> | Prisma.UserHasRolesCreateWithoutRoleInput[] | Prisma.UserHasRolesUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutRoleInput | Prisma.UserHasRolesCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.UserHasRolesCreateManyRoleInputEnvelope;
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
};
export type UserHasRolesUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutRoleInput, Prisma.UserHasRolesUncheckedCreateWithoutRoleInput> | Prisma.UserHasRolesCreateWithoutRoleInput[] | Prisma.UserHasRolesUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutRoleInput | Prisma.UserHasRolesCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.UserHasRolesCreateManyRoleInputEnvelope;
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
};
export type UserHasRolesUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutRoleInput, Prisma.UserHasRolesUncheckedCreateWithoutRoleInput> | Prisma.UserHasRolesCreateWithoutRoleInput[] | Prisma.UserHasRolesUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutRoleInput | Prisma.UserHasRolesCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.UserHasRolesUpsertWithWhereUniqueWithoutRoleInput | Prisma.UserHasRolesUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.UserHasRolesCreateManyRoleInputEnvelope;
    set?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    disconnect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    delete?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    update?: Prisma.UserHasRolesUpdateWithWhereUniqueWithoutRoleInput | Prisma.UserHasRolesUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.UserHasRolesUpdateManyWithWhereWithoutRoleInput | Prisma.UserHasRolesUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.UserHasRolesScalarWhereInput | Prisma.UserHasRolesScalarWhereInput[];
};
export type UserHasRolesUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.UserHasRolesCreateWithoutRoleInput, Prisma.UserHasRolesUncheckedCreateWithoutRoleInput> | Prisma.UserHasRolesCreateWithoutRoleInput[] | Prisma.UserHasRolesUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserHasRolesCreateOrConnectWithoutRoleInput | Prisma.UserHasRolesCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.UserHasRolesUpsertWithWhereUniqueWithoutRoleInput | Prisma.UserHasRolesUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.UserHasRolesCreateManyRoleInputEnvelope;
    set?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    disconnect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    delete?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    connect?: Prisma.UserHasRolesWhereUniqueInput | Prisma.UserHasRolesWhereUniqueInput[];
    update?: Prisma.UserHasRolesUpdateWithWhereUniqueWithoutRoleInput | Prisma.UserHasRolesUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.UserHasRolesUpdateManyWithWhereWithoutRoleInput | Prisma.UserHasRolesUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.UserHasRolesScalarWhereInput | Prisma.UserHasRolesScalarWhereInput[];
};
export type UserHasRolesCreateWithoutUserInput = {
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
};
export type UserHasRolesUncheckedCreateWithoutUserInput = {
    roleId: number;
};
export type UserHasRolesCreateOrConnectWithoutUserInput = {
    where: Prisma.UserHasRolesWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserHasRolesCreateWithoutUserInput, Prisma.UserHasRolesUncheckedCreateWithoutUserInput>;
};
export type UserHasRolesCreateManyUserInputEnvelope = {
    data: Prisma.UserHasRolesCreateManyUserInput | Prisma.UserHasRolesCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserHasRolesUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserHasRolesWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserHasRolesUpdateWithoutUserInput, Prisma.UserHasRolesUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserHasRolesCreateWithoutUserInput, Prisma.UserHasRolesUncheckedCreateWithoutUserInput>;
};
export type UserHasRolesUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserHasRolesWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserHasRolesUpdateWithoutUserInput, Prisma.UserHasRolesUncheckedUpdateWithoutUserInput>;
};
export type UserHasRolesUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserHasRolesScalarWhereInput;
    data: Prisma.XOR<Prisma.UserHasRolesUpdateManyMutationInput, Prisma.UserHasRolesUncheckedUpdateManyWithoutUserInput>;
};
export type UserHasRolesScalarWhereInput = {
    AND?: Prisma.UserHasRolesScalarWhereInput | Prisma.UserHasRolesScalarWhereInput[];
    OR?: Prisma.UserHasRolesScalarWhereInput[];
    NOT?: Prisma.UserHasRolesScalarWhereInput | Prisma.UserHasRolesScalarWhereInput[];
    userId?: Prisma.IntFilter<"UserHasRoles"> | number;
    roleId?: Prisma.IntFilter<"UserHasRoles"> | number;
};
export type UserHasRolesCreateWithoutRoleInput = {
    user: Prisma.UserCreateNestedOneWithoutRolesInput;
};
export type UserHasRolesUncheckedCreateWithoutRoleInput = {
    userId: number;
};
export type UserHasRolesCreateOrConnectWithoutRoleInput = {
    where: Prisma.UserHasRolesWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserHasRolesCreateWithoutRoleInput, Prisma.UserHasRolesUncheckedCreateWithoutRoleInput>;
};
export type UserHasRolesCreateManyRoleInputEnvelope = {
    data: Prisma.UserHasRolesCreateManyRoleInput | Prisma.UserHasRolesCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type UserHasRolesUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.UserHasRolesWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserHasRolesUpdateWithoutRoleInput, Prisma.UserHasRolesUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.UserHasRolesCreateWithoutRoleInput, Prisma.UserHasRolesUncheckedCreateWithoutRoleInput>;
};
export type UserHasRolesUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.UserHasRolesWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserHasRolesUpdateWithoutRoleInput, Prisma.UserHasRolesUncheckedUpdateWithoutRoleInput>;
};
export type UserHasRolesUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.UserHasRolesScalarWhereInput;
    data: Prisma.XOR<Prisma.UserHasRolesUpdateManyMutationInput, Prisma.UserHasRolesUncheckedUpdateManyWithoutRoleInput>;
};
export type UserHasRolesCreateManyUserInput = {
    roleId: number;
};
export type UserHasRolesUpdateWithoutUserInput = {
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserHasRolesUncheckedUpdateWithoutUserInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserHasRolesUncheckedUpdateManyWithoutUserInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserHasRolesCreateManyRoleInput = {
    userId: number;
};
export type UserHasRolesUpdateWithoutRoleInput = {
    user?: Prisma.UserUpdateOneRequiredWithoutRolesNestedInput;
};
export type UserHasRolesUncheckedUpdateWithoutRoleInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserHasRolesUncheckedUpdateManyWithoutRoleInput = {
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UserHasRolesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    userId?: boolean;
    roleId?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userHasRoles"]>;
export type UserHasRolesSelectScalar = {
    userId?: boolean;
    roleId?: boolean;
};
export type UserHasRolesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"userId" | "roleId", ExtArgs["result"]["userHasRoles"]>;
export type UserHasRolesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
};
export type $UserHasRolesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserHasRoles";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        role: Prisma.$RolePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        userId: number;
        roleId: number;
    }, ExtArgs["result"]["userHasRoles"]>;
    composites: {};
};
export type UserHasRolesGetPayload<S extends boolean | null | undefined | UserHasRolesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload, S>;
export type UserHasRolesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserHasRolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserHasRolesCountAggregateInputType | true;
};
export interface UserHasRolesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserHasRoles'];
        meta: {
            name: 'UserHasRoles';
        };
    };
    /**
     * Find zero or one UserHasRoles that matches the filter.
     * @param {UserHasRolesFindUniqueArgs} args - Arguments to find a UserHasRoles
     * @example
     * // Get one UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserHasRolesFindUniqueArgs>(args: Prisma.SelectSubset<T, UserHasRolesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UserHasRoles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserHasRolesFindUniqueOrThrowArgs} args - Arguments to find a UserHasRoles
     * @example
     * // Get one UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserHasRolesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserHasRolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserHasRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesFindFirstArgs} args - Arguments to find a UserHasRoles
     * @example
     * // Get one UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserHasRolesFindFirstArgs>(args?: Prisma.SelectSubset<T, UserHasRolesFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserHasRoles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesFindFirstOrThrowArgs} args - Arguments to find a UserHasRoles
     * @example
     * // Get one UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserHasRolesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserHasRolesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UserHasRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.findMany()
     *
     * // Get first 10 UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const userHasRolesWithUserIdOnly = await prisma.userHasRoles.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends UserHasRolesFindManyArgs>(args?: Prisma.SelectSubset<T, UserHasRolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UserHasRoles.
     * @param {UserHasRolesCreateArgs} args - Arguments to create a UserHasRoles.
     * @example
     * // Create one UserHasRoles
     * const UserHasRoles = await prisma.userHasRoles.create({
     *   data: {
     *     // ... data to create a UserHasRoles
     *   }
     * })
     *
     */
    create<T extends UserHasRolesCreateArgs>(args: Prisma.SelectSubset<T, UserHasRolesCreateArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UserHasRoles.
     * @param {UserHasRolesCreateManyArgs} args - Arguments to create many UserHasRoles.
     * @example
     * // Create many UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserHasRolesCreateManyArgs>(args?: Prisma.SelectSubset<T, UserHasRolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a UserHasRoles.
     * @param {UserHasRolesDeleteArgs} args - Arguments to delete one UserHasRoles.
     * @example
     * // Delete one UserHasRoles
     * const UserHasRoles = await prisma.userHasRoles.delete({
     *   where: {
     *     // ... filter to delete one UserHasRoles
     *   }
     * })
     *
     */
    delete<T extends UserHasRolesDeleteArgs>(args: Prisma.SelectSubset<T, UserHasRolesDeleteArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UserHasRoles.
     * @param {UserHasRolesUpdateArgs} args - Arguments to update one UserHasRoles.
     * @example
     * // Update one UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserHasRolesUpdateArgs>(args: Prisma.SelectSubset<T, UserHasRolesUpdateArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UserHasRoles.
     * @param {UserHasRolesDeleteManyArgs} args - Arguments to filter UserHasRoles to delete.
     * @example
     * // Delete a few UserHasRoles
     * const { count } = await prisma.userHasRoles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserHasRolesDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserHasRolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserHasRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserHasRolesUpdateManyArgs>(args: Prisma.SelectSubset<T, UserHasRolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one UserHasRoles.
     * @param {UserHasRolesUpsertArgs} args - Arguments to update or create a UserHasRoles.
     * @example
     * // Update or create a UserHasRoles
     * const userHasRoles = await prisma.userHasRoles.upsert({
     *   create: {
     *     // ... data to create a UserHasRoles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserHasRoles we want to update
     *   }
     * })
     */
    upsert<T extends UserHasRolesUpsertArgs>(args: Prisma.SelectSubset<T, UserHasRolesUpsertArgs<ExtArgs>>): Prisma.Prisma__UserHasRolesClient<runtime.Types.Result.GetResult<Prisma.$UserHasRolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UserHasRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesCountArgs} args - Arguments to filter UserHasRoles to count.
     * @example
     * // Count the number of UserHasRoles
     * const count = await prisma.userHasRoles.count({
     *   where: {
     *     // ... the filter for the UserHasRoles we want to count
     *   }
     * })
    **/
    count<T extends UserHasRolesCountArgs>(args?: Prisma.Subset<T, UserHasRolesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserHasRolesCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UserHasRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserHasRolesAggregateArgs>(args: Prisma.Subset<T, UserHasRolesAggregateArgs>): Prisma.PrismaPromise<GetUserHasRolesAggregateType<T>>;
    /**
     * Group by UserHasRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserHasRolesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserHasRolesGroupByArgs['orderBy'];
    } : {
        orderBy?: UserHasRolesGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserHasRolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserHasRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserHasRoles model
     */
    readonly fields: UserHasRolesFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UserHasRoles.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserHasRolesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the UserHasRoles model
 */
export interface UserHasRolesFieldRefs {
    readonly userId: Prisma.FieldRef<"UserHasRoles", 'Int'>;
    readonly roleId: Prisma.FieldRef<"UserHasRoles", 'Int'>;
}
/**
 * UserHasRoles findUnique
 */
export type UserHasRolesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * Filter, which UserHasRoles to fetch.
     */
    where: Prisma.UserHasRolesWhereUniqueInput;
};
/**
 * UserHasRoles findUniqueOrThrow
 */
export type UserHasRolesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * Filter, which UserHasRoles to fetch.
     */
    where: Prisma.UserHasRolesWhereUniqueInput;
};
/**
 * UserHasRoles findFirst
 */
export type UserHasRolesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * Filter, which UserHasRoles to fetch.
     */
    where?: Prisma.UserHasRolesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: Prisma.UserHasRolesOrderByWithRelationInput | Prisma.UserHasRolesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserHasRoles.
     */
    cursor?: Prisma.UserHasRolesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserHasRoles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserHasRoles.
     */
    distinct?: Prisma.UserHasRolesScalarFieldEnum | Prisma.UserHasRolesScalarFieldEnum[];
};
/**
 * UserHasRoles findFirstOrThrow
 */
export type UserHasRolesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * Filter, which UserHasRoles to fetch.
     */
    where?: Prisma.UserHasRolesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: Prisma.UserHasRolesOrderByWithRelationInput | Prisma.UserHasRolesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserHasRoles.
     */
    cursor?: Prisma.UserHasRolesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserHasRoles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserHasRoles.
     */
    distinct?: Prisma.UserHasRolesScalarFieldEnum | Prisma.UserHasRolesScalarFieldEnum[];
};
/**
 * UserHasRoles findMany
 */
export type UserHasRolesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * Filter, which UserHasRoles to fetch.
     */
    where?: Prisma.UserHasRolesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: Prisma.UserHasRolesOrderByWithRelationInput | Prisma.UserHasRolesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserHasRoles.
     */
    cursor?: Prisma.UserHasRolesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserHasRoles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserHasRoles.
     */
    distinct?: Prisma.UserHasRolesScalarFieldEnum | Prisma.UserHasRolesScalarFieldEnum[];
};
/**
 * UserHasRoles create
 */
export type UserHasRolesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserHasRoles.
     */
    data: Prisma.XOR<Prisma.UserHasRolesCreateInput, Prisma.UserHasRolesUncheckedCreateInput>;
};
/**
 * UserHasRoles createMany
 */
export type UserHasRolesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserHasRoles.
     */
    data: Prisma.UserHasRolesCreateManyInput | Prisma.UserHasRolesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UserHasRoles update
 */
export type UserHasRolesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserHasRoles.
     */
    data: Prisma.XOR<Prisma.UserHasRolesUpdateInput, Prisma.UserHasRolesUncheckedUpdateInput>;
    /**
     * Choose, which UserHasRoles to update.
     */
    where: Prisma.UserHasRolesWhereUniqueInput;
};
/**
 * UserHasRoles updateMany
 */
export type UserHasRolesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UserHasRoles.
     */
    data: Prisma.XOR<Prisma.UserHasRolesUpdateManyMutationInput, Prisma.UserHasRolesUncheckedUpdateManyInput>;
    /**
     * Filter which UserHasRoles to update
     */
    where?: Prisma.UserHasRolesWhereInput;
    /**
     * Limit how many UserHasRoles to update.
     */
    limit?: number;
};
/**
 * UserHasRoles upsert
 */
export type UserHasRolesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserHasRoles to update in case it exists.
     */
    where: Prisma.UserHasRolesWhereUniqueInput;
    /**
     * In case the UserHasRoles found by the `where` argument doesn't exist, create a new UserHasRoles with this data.
     */
    create: Prisma.XOR<Prisma.UserHasRolesCreateInput, Prisma.UserHasRolesUncheckedCreateInput>;
    /**
     * In case the UserHasRoles was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserHasRolesUpdateInput, Prisma.UserHasRolesUncheckedUpdateInput>;
};
/**
 * UserHasRoles delete
 */
export type UserHasRolesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
    /**
     * Filter which UserHasRoles to delete.
     */
    where: Prisma.UserHasRolesWhereUniqueInput;
};
/**
 * UserHasRoles deleteMany
 */
export type UserHasRolesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserHasRoles to delete
     */
    where?: Prisma.UserHasRolesWhereInput;
    /**
     * Limit how many UserHasRoles to delete.
     */
    limit?: number;
};
/**
 * UserHasRoles without action
 */
export type UserHasRolesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRoles
     */
    select?: Prisma.UserHasRolesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserHasRoles
     */
    omit?: Prisma.UserHasRolesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserHasRolesInclude<ExtArgs> | null;
};
//# sourceMappingURL=UserHasRoles.d.ts.map