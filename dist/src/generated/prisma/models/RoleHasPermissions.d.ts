import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model RoleHasPermissions
 *
 */
export type RoleHasPermissionsModel = runtime.Types.Result.DefaultSelection<Prisma.$RoleHasPermissionsPayload>;
export type AggregateRoleHasPermissions = {
    _count: RoleHasPermissionsCountAggregateOutputType | null;
    _avg: RoleHasPermissionsAvgAggregateOutputType | null;
    _sum: RoleHasPermissionsSumAggregateOutputType | null;
    _min: RoleHasPermissionsMinAggregateOutputType | null;
    _max: RoleHasPermissionsMaxAggregateOutputType | null;
};
export type RoleHasPermissionsAvgAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RoleHasPermissionsSumAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RoleHasPermissionsMinAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RoleHasPermissionsMaxAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RoleHasPermissionsCountAggregateOutputType = {
    roleId: number;
    permissionId: number;
    _all: number;
};
export type RoleHasPermissionsAvgAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RoleHasPermissionsSumAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RoleHasPermissionsMinAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RoleHasPermissionsMaxAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RoleHasPermissionsCountAggregateInputType = {
    roleId?: true;
    permissionId?: true;
    _all?: true;
};
export type RoleHasPermissionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHasPermissions to aggregate.
     */
    where?: Prisma.RoleHasPermissionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: Prisma.RoleHasPermissionsOrderByWithRelationInput | Prisma.RoleHasPermissionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RoleHasPermissionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RoleHasPermissions
    **/
    _count?: true | RoleHasPermissionsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RoleHasPermissionsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RoleHasPermissionsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RoleHasPermissionsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RoleHasPermissionsMaxAggregateInputType;
};
export type GetRoleHasPermissionsAggregateType<T extends RoleHasPermissionsAggregateArgs> = {
    [P in keyof T & keyof AggregateRoleHasPermissions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoleHasPermissions[P]> : Prisma.GetScalarType<T[P], AggregateRoleHasPermissions[P]>;
};
export type RoleHasPermissionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoleHasPermissionsWhereInput;
    orderBy?: Prisma.RoleHasPermissionsOrderByWithAggregationInput | Prisma.RoleHasPermissionsOrderByWithAggregationInput[];
    by: Prisma.RoleHasPermissionsScalarFieldEnum[] | Prisma.RoleHasPermissionsScalarFieldEnum;
    having?: Prisma.RoleHasPermissionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoleHasPermissionsCountAggregateInputType | true;
    _avg?: RoleHasPermissionsAvgAggregateInputType;
    _sum?: RoleHasPermissionsSumAggregateInputType;
    _min?: RoleHasPermissionsMinAggregateInputType;
    _max?: RoleHasPermissionsMaxAggregateInputType;
};
export type RoleHasPermissionsGroupByOutputType = {
    roleId: number;
    permissionId: number;
    _count: RoleHasPermissionsCountAggregateOutputType | null;
    _avg: RoleHasPermissionsAvgAggregateOutputType | null;
    _sum: RoleHasPermissionsSumAggregateOutputType | null;
    _min: RoleHasPermissionsMinAggregateOutputType | null;
    _max: RoleHasPermissionsMaxAggregateOutputType | null;
};
export type GetRoleHasPermissionsGroupByPayload<T extends RoleHasPermissionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoleHasPermissionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoleHasPermissionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoleHasPermissionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoleHasPermissionsGroupByOutputType[P]>;
}>>;
export type RoleHasPermissionsWhereInput = {
    AND?: Prisma.RoleHasPermissionsWhereInput | Prisma.RoleHasPermissionsWhereInput[];
    OR?: Prisma.RoleHasPermissionsWhereInput[];
    NOT?: Prisma.RoleHasPermissionsWhereInput | Prisma.RoleHasPermissionsWhereInput[];
    roleId?: Prisma.IntFilter<"RoleHasPermissions"> | number;
    permissionId?: Prisma.IntFilter<"RoleHasPermissions"> | number;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    permission?: Prisma.XOR<Prisma.PermissionScalarRelationFilter, Prisma.PermissionWhereInput>;
};
export type RoleHasPermissionsOrderByWithRelationInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
    role?: Prisma.RoleOrderByWithRelationInput;
    permission?: Prisma.PermissionOrderByWithRelationInput;
};
export type RoleHasPermissionsWhereUniqueInput = Prisma.AtLeast<{
    roleId_permissionId?: Prisma.RoleHasPermissionsRoleIdPermissionIdCompoundUniqueInput;
    AND?: Prisma.RoleHasPermissionsWhereInput | Prisma.RoleHasPermissionsWhereInput[];
    OR?: Prisma.RoleHasPermissionsWhereInput[];
    NOT?: Prisma.RoleHasPermissionsWhereInput | Prisma.RoleHasPermissionsWhereInput[];
    roleId?: Prisma.IntFilter<"RoleHasPermissions"> | number;
    permissionId?: Prisma.IntFilter<"RoleHasPermissions"> | number;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    permission?: Prisma.XOR<Prisma.PermissionScalarRelationFilter, Prisma.PermissionWhereInput>;
}, "roleId_permissionId">;
export type RoleHasPermissionsOrderByWithAggregationInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
    _count?: Prisma.RoleHasPermissionsCountOrderByAggregateInput;
    _avg?: Prisma.RoleHasPermissionsAvgOrderByAggregateInput;
    _max?: Prisma.RoleHasPermissionsMaxOrderByAggregateInput;
    _min?: Prisma.RoleHasPermissionsMinOrderByAggregateInput;
    _sum?: Prisma.RoleHasPermissionsSumOrderByAggregateInput;
};
export type RoleHasPermissionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoleHasPermissionsScalarWhereWithAggregatesInput | Prisma.RoleHasPermissionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoleHasPermissionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoleHasPermissionsScalarWhereWithAggregatesInput | Prisma.RoleHasPermissionsScalarWhereWithAggregatesInput[];
    roleId?: Prisma.IntWithAggregatesFilter<"RoleHasPermissions"> | number;
    permissionId?: Prisma.IntWithAggregatesFilter<"RoleHasPermissions"> | number;
};
export type RoleHasPermissionsCreateInput = {
    role: Prisma.RoleCreateNestedOneWithoutPermissionsInput;
    permission: Prisma.PermissionCreateNestedOneWithoutRolesInput;
};
export type RoleHasPermissionsUncheckedCreateInput = {
    roleId: number;
    permissionId: number;
};
export type RoleHasPermissionsUpdateInput = {
    role?: Prisma.RoleUpdateOneRequiredWithoutPermissionsNestedInput;
    permission?: Prisma.PermissionUpdateOneRequiredWithoutRolesNestedInput;
};
export type RoleHasPermissionsUncheckedUpdateInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RoleHasPermissionsCreateManyInput = {
    roleId: number;
    permissionId: number;
};
export type RoleHasPermissionsUpdateManyMutationInput = {};
export type RoleHasPermissionsUncheckedUpdateManyInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RoleHasPermissionsListRelationFilter = {
    every?: Prisma.RoleHasPermissionsWhereInput;
    some?: Prisma.RoleHasPermissionsWhereInput;
    none?: Prisma.RoleHasPermissionsWhereInput;
};
export type RoleHasPermissionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoleHasPermissionsRoleIdPermissionIdCompoundUniqueInput = {
    roleId: number;
    permissionId: number;
};
export type RoleHasPermissionsCountOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RoleHasPermissionsAvgOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RoleHasPermissionsMaxOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RoleHasPermissionsMinOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RoleHasPermissionsSumOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RoleHasPermissionsCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput> | Prisma.RoleHasPermissionsCreateWithoutRoleInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyRoleInputEnvelope;
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
};
export type RoleHasPermissionsUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput> | Prisma.RoleHasPermissionsCreateWithoutRoleInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyRoleInputEnvelope;
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
};
export type RoleHasPermissionsUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput> | Prisma.RoleHasPermissionsCreateWithoutRoleInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutRoleInput | Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyRoleInputEnvelope;
    set?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    disconnect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    delete?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    update?: Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutRoleInput | Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutRoleInput | Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.RoleHasPermissionsScalarWhereInput | Prisma.RoleHasPermissionsScalarWhereInput[];
};
export type RoleHasPermissionsUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput> | Prisma.RoleHasPermissionsCreateWithoutRoleInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutRoleInput | Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyRoleInputEnvelope;
    set?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    disconnect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    delete?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    update?: Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutRoleInput | Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutRoleInput | Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.RoleHasPermissionsScalarWhereInput | Prisma.RoleHasPermissionsScalarWhereInput[];
};
export type RoleHasPermissionsCreateNestedManyWithoutPermissionInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput> | Prisma.RoleHasPermissionsCreateWithoutPermissionInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyPermissionInputEnvelope;
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
};
export type RoleHasPermissionsUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput> | Prisma.RoleHasPermissionsCreateWithoutPermissionInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyPermissionInputEnvelope;
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
};
export type RoleHasPermissionsUpdateManyWithoutPermissionNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput> | Prisma.RoleHasPermissionsCreateWithoutPermissionInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput[];
    upsert?: Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutPermissionInput | Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutPermissionInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyPermissionInputEnvelope;
    set?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    disconnect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    delete?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    update?: Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutPermissionInput | Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutPermissionInput[];
    updateMany?: Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutPermissionInput | Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutPermissionInput[];
    deleteMany?: Prisma.RoleHasPermissionsScalarWhereInput | Prisma.RoleHasPermissionsScalarWhereInput[];
};
export type RoleHasPermissionsUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput> | Prisma.RoleHasPermissionsCreateWithoutPermissionInput[] | Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput | Prisma.RoleHasPermissionsCreateOrConnectWithoutPermissionInput[];
    upsert?: Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutPermissionInput | Prisma.RoleHasPermissionsUpsertWithWhereUniqueWithoutPermissionInput[];
    createMany?: Prisma.RoleHasPermissionsCreateManyPermissionInputEnvelope;
    set?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    disconnect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    delete?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    connect?: Prisma.RoleHasPermissionsWhereUniqueInput | Prisma.RoleHasPermissionsWhereUniqueInput[];
    update?: Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutPermissionInput | Prisma.RoleHasPermissionsUpdateWithWhereUniqueWithoutPermissionInput[];
    updateMany?: Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutPermissionInput | Prisma.RoleHasPermissionsUpdateManyWithWhereWithoutPermissionInput[];
    deleteMany?: Prisma.RoleHasPermissionsScalarWhereInput | Prisma.RoleHasPermissionsScalarWhereInput[];
};
export type RoleHasPermissionsCreateWithoutRoleInput = {
    permission: Prisma.PermissionCreateNestedOneWithoutRolesInput;
};
export type RoleHasPermissionsUncheckedCreateWithoutRoleInput = {
    permissionId: number;
};
export type RoleHasPermissionsCreateOrConnectWithoutRoleInput = {
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput>;
};
export type RoleHasPermissionsCreateManyRoleInputEnvelope = {
    data: Prisma.RoleHasPermissionsCreateManyRoleInput | Prisma.RoleHasPermissionsCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type RoleHasPermissionsUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoleHasPermissionsUpdateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutRoleInput>;
};
export type RoleHasPermissionsUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoleHasPermissionsUpdateWithoutRoleInput, Prisma.RoleHasPermissionsUncheckedUpdateWithoutRoleInput>;
};
export type RoleHasPermissionsUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.RoleHasPermissionsScalarWhereInput;
    data: Prisma.XOR<Prisma.RoleHasPermissionsUpdateManyMutationInput, Prisma.RoleHasPermissionsUncheckedUpdateManyWithoutRoleInput>;
};
export type RoleHasPermissionsScalarWhereInput = {
    AND?: Prisma.RoleHasPermissionsScalarWhereInput | Prisma.RoleHasPermissionsScalarWhereInput[];
    OR?: Prisma.RoleHasPermissionsScalarWhereInput[];
    NOT?: Prisma.RoleHasPermissionsScalarWhereInput | Prisma.RoleHasPermissionsScalarWhereInput[];
    roleId?: Prisma.IntFilter<"RoleHasPermissions"> | number;
    permissionId?: Prisma.IntFilter<"RoleHasPermissions"> | number;
};
export type RoleHasPermissionsCreateWithoutPermissionInput = {
    role: Prisma.RoleCreateNestedOneWithoutPermissionsInput;
};
export type RoleHasPermissionsUncheckedCreateWithoutPermissionInput = {
    roleId: number;
};
export type RoleHasPermissionsCreateOrConnectWithoutPermissionInput = {
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput>;
};
export type RoleHasPermissionsCreateManyPermissionInputEnvelope = {
    data: Prisma.RoleHasPermissionsCreateManyPermissionInput | Prisma.RoleHasPermissionsCreateManyPermissionInput[];
    skipDuplicates?: boolean;
};
export type RoleHasPermissionsUpsertWithWhereUniqueWithoutPermissionInput = {
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoleHasPermissionsUpdateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedUpdateWithoutPermissionInput>;
    create: Prisma.XOR<Prisma.RoleHasPermissionsCreateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedCreateWithoutPermissionInput>;
};
export type RoleHasPermissionsUpdateWithWhereUniqueWithoutPermissionInput = {
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoleHasPermissionsUpdateWithoutPermissionInput, Prisma.RoleHasPermissionsUncheckedUpdateWithoutPermissionInput>;
};
export type RoleHasPermissionsUpdateManyWithWhereWithoutPermissionInput = {
    where: Prisma.RoleHasPermissionsScalarWhereInput;
    data: Prisma.XOR<Prisma.RoleHasPermissionsUpdateManyMutationInput, Prisma.RoleHasPermissionsUncheckedUpdateManyWithoutPermissionInput>;
};
export type RoleHasPermissionsCreateManyRoleInput = {
    permissionId: number;
};
export type RoleHasPermissionsUpdateWithoutRoleInput = {
    permission?: Prisma.PermissionUpdateOneRequiredWithoutRolesNestedInput;
};
export type RoleHasPermissionsUncheckedUpdateWithoutRoleInput = {
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RoleHasPermissionsUncheckedUpdateManyWithoutRoleInput = {
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RoleHasPermissionsCreateManyPermissionInput = {
    roleId: number;
};
export type RoleHasPermissionsUpdateWithoutPermissionInput = {
    role?: Prisma.RoleUpdateOneRequiredWithoutPermissionsNestedInput;
};
export type RoleHasPermissionsUncheckedUpdateWithoutPermissionInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RoleHasPermissionsUncheckedUpdateManyWithoutPermissionInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RoleHasPermissionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    roleId?: boolean;
    permissionId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roleHasPermissions"]>;
export type RoleHasPermissionsSelectScalar = {
    roleId?: boolean;
    permissionId?: boolean;
};
export type RoleHasPermissionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"roleId" | "permissionId", ExtArgs["result"]["roleHasPermissions"]>;
export type RoleHasPermissionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
};
export type $RoleHasPermissionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoleHasPermissions";
    objects: {
        role: Prisma.$RolePayload<ExtArgs>;
        permission: Prisma.$PermissionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        roleId: number;
        permissionId: number;
    }, ExtArgs["result"]["roleHasPermissions"]>;
    composites: {};
};
export type RoleHasPermissionsGetPayload<S extends boolean | null | undefined | RoleHasPermissionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload, S>;
export type RoleHasPermissionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoleHasPermissionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoleHasPermissionsCountAggregateInputType | true;
};
export interface RoleHasPermissionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoleHasPermissions'];
        meta: {
            name: 'RoleHasPermissions';
        };
    };
    /**
     * Find zero or one RoleHasPermissions that matches the filter.
     * @param {RoleHasPermissionsFindUniqueArgs} args - Arguments to find a RoleHasPermissions
     * @example
     * // Get one RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleHasPermissionsFindUniqueArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RoleHasPermissions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleHasPermissionsFindUniqueOrThrowArgs} args - Arguments to find a RoleHasPermissions
     * @example
     * // Get one RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleHasPermissionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RoleHasPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsFindFirstArgs} args - Arguments to find a RoleHasPermissions
     * @example
     * // Get one RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleHasPermissionsFindFirstArgs>(args?: Prisma.SelectSubset<T, RoleHasPermissionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RoleHasPermissions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsFindFirstOrThrowArgs} args - Arguments to find a RoleHasPermissions
     * @example
     * // Get one RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleHasPermissionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoleHasPermissionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RoleHasPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.findMany()
     *
     * // Get first 10 RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.findMany({ take: 10 })
     *
     * // Only select the `roleId`
     * const roleHasPermissionsWithRoleIdOnly = await prisma.roleHasPermissions.findMany({ select: { roleId: true } })
     *
     */
    findMany<T extends RoleHasPermissionsFindManyArgs>(args?: Prisma.SelectSubset<T, RoleHasPermissionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RoleHasPermissions.
     * @param {RoleHasPermissionsCreateArgs} args - Arguments to create a RoleHasPermissions.
     * @example
     * // Create one RoleHasPermissions
     * const RoleHasPermissions = await prisma.roleHasPermissions.create({
     *   data: {
     *     // ... data to create a RoleHasPermissions
     *   }
     * })
     *
     */
    create<T extends RoleHasPermissionsCreateArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsCreateArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RoleHasPermissions.
     * @param {RoleHasPermissionsCreateManyArgs} args - Arguments to create many RoleHasPermissions.
     * @example
     * // Create many RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RoleHasPermissionsCreateManyArgs>(args?: Prisma.SelectSubset<T, RoleHasPermissionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a RoleHasPermissions.
     * @param {RoleHasPermissionsDeleteArgs} args - Arguments to delete one RoleHasPermissions.
     * @example
     * // Delete one RoleHasPermissions
     * const RoleHasPermissions = await prisma.roleHasPermissions.delete({
     *   where: {
     *     // ... filter to delete one RoleHasPermissions
     *   }
     * })
     *
     */
    delete<T extends RoleHasPermissionsDeleteArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsDeleteArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RoleHasPermissions.
     * @param {RoleHasPermissionsUpdateArgs} args - Arguments to update one RoleHasPermissions.
     * @example
     * // Update one RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RoleHasPermissionsUpdateArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsUpdateArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RoleHasPermissions.
     * @param {RoleHasPermissionsDeleteManyArgs} args - Arguments to filter RoleHasPermissions to delete.
     * @example
     * // Delete a few RoleHasPermissions
     * const { count } = await prisma.roleHasPermissions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RoleHasPermissionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoleHasPermissionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RoleHasPermissionsUpdateManyArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one RoleHasPermissions.
     * @param {RoleHasPermissionsUpsertArgs} args - Arguments to update or create a RoleHasPermissions.
     * @example
     * // Update or create a RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermissions.upsert({
     *   create: {
     *     // ... data to create a RoleHasPermissions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleHasPermissions we want to update
     *   }
     * })
     */
    upsert<T extends RoleHasPermissionsUpsertArgs>(args: Prisma.SelectSubset<T, RoleHasPermissionsUpsertArgs<ExtArgs>>): Prisma.Prisma__RoleHasPermissionsClient<runtime.Types.Result.GetResult<Prisma.$RoleHasPermissionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsCountArgs} args - Arguments to filter RoleHasPermissions to count.
     * @example
     * // Count the number of RoleHasPermissions
     * const count = await prisma.roleHasPermissions.count({
     *   where: {
     *     // ... the filter for the RoleHasPermissions we want to count
     *   }
     * })
    **/
    count<T extends RoleHasPermissionsCountArgs>(args?: Prisma.Subset<T, RoleHasPermissionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoleHasPermissionsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleHasPermissionsAggregateArgs>(args: Prisma.Subset<T, RoleHasPermissionsAggregateArgs>): Prisma.PrismaPromise<GetRoleHasPermissionsAggregateType<T>>;
    /**
     * Group by RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RoleHasPermissionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoleHasPermissionsGroupByArgs['orderBy'];
    } : {
        orderBy?: RoleHasPermissionsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoleHasPermissionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleHasPermissionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RoleHasPermissions model
     */
    readonly fields: RoleHasPermissionsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RoleHasPermissions.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RoleHasPermissionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    permission<T extends Prisma.PermissionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PermissionDefaultArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the RoleHasPermissions model
 */
export interface RoleHasPermissionsFieldRefs {
    readonly roleId: Prisma.FieldRef<"RoleHasPermissions", 'Int'>;
    readonly permissionId: Prisma.FieldRef<"RoleHasPermissions", 'Int'>;
}
/**
 * RoleHasPermissions findUnique
 */
export type RoleHasPermissionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
};
/**
 * RoleHasPermissions findUniqueOrThrow
 */
export type RoleHasPermissionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
};
/**
 * RoleHasPermissions findFirst
 */
export type RoleHasPermissionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where?: Prisma.RoleHasPermissionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: Prisma.RoleHasPermissionsOrderByWithRelationInput | Prisma.RoleHasPermissionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoleHasPermissions.
     */
    cursor?: Prisma.RoleHasPermissionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: Prisma.RoleHasPermissionsScalarFieldEnum | Prisma.RoleHasPermissionsScalarFieldEnum[];
};
/**
 * RoleHasPermissions findFirstOrThrow
 */
export type RoleHasPermissionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where?: Prisma.RoleHasPermissionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: Prisma.RoleHasPermissionsOrderByWithRelationInput | Prisma.RoleHasPermissionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RoleHasPermissions.
     */
    cursor?: Prisma.RoleHasPermissionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: Prisma.RoleHasPermissionsScalarFieldEnum | Prisma.RoleHasPermissionsScalarFieldEnum[];
};
/**
 * RoleHasPermissions findMany
 */
export type RoleHasPermissionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where?: Prisma.RoleHasPermissionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: Prisma.RoleHasPermissionsOrderByWithRelationInput | Prisma.RoleHasPermissionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RoleHasPermissions.
     */
    cursor?: Prisma.RoleHasPermissionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: Prisma.RoleHasPermissionsScalarFieldEnum | Prisma.RoleHasPermissionsScalarFieldEnum[];
};
/**
 * RoleHasPermissions create
 */
export type RoleHasPermissionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * The data needed to create a RoleHasPermissions.
     */
    data: Prisma.XOR<Prisma.RoleHasPermissionsCreateInput, Prisma.RoleHasPermissionsUncheckedCreateInput>;
};
/**
 * RoleHasPermissions createMany
 */
export type RoleHasPermissionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleHasPermissions.
     */
    data: Prisma.RoleHasPermissionsCreateManyInput | Prisma.RoleHasPermissionsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RoleHasPermissions update
 */
export type RoleHasPermissionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * The data needed to update a RoleHasPermissions.
     */
    data: Prisma.XOR<Prisma.RoleHasPermissionsUpdateInput, Prisma.RoleHasPermissionsUncheckedUpdateInput>;
    /**
     * Choose, which RoleHasPermissions to update.
     */
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
};
/**
 * RoleHasPermissions updateMany
 */
export type RoleHasPermissionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleHasPermissions.
     */
    data: Prisma.XOR<Prisma.RoleHasPermissionsUpdateManyMutationInput, Prisma.RoleHasPermissionsUncheckedUpdateManyInput>;
    /**
     * Filter which RoleHasPermissions to update
     */
    where?: Prisma.RoleHasPermissionsWhereInput;
    /**
     * Limit how many RoleHasPermissions to update.
     */
    limit?: number;
};
/**
 * RoleHasPermissions upsert
 */
export type RoleHasPermissionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * The filter to search for the RoleHasPermissions to update in case it exists.
     */
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
    /**
     * In case the RoleHasPermissions found by the `where` argument doesn't exist, create a new RoleHasPermissions with this data.
     */
    create: Prisma.XOR<Prisma.RoleHasPermissionsCreateInput, Prisma.RoleHasPermissionsUncheckedCreateInput>;
    /**
     * In case the RoleHasPermissions was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RoleHasPermissionsUpdateInput, Prisma.RoleHasPermissionsUncheckedUpdateInput>;
};
/**
 * RoleHasPermissions delete
 */
export type RoleHasPermissionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
    /**
     * Filter which RoleHasPermissions to delete.
     */
    where: Prisma.RoleHasPermissionsWhereUniqueInput;
};
/**
 * RoleHasPermissions deleteMany
 */
export type RoleHasPermissionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHasPermissions to delete
     */
    where?: Prisma.RoleHasPermissionsWhereInput;
    /**
     * Limit how many RoleHasPermissions to delete.
     */
    limit?: number;
};
/**
 * RoleHasPermissions without action
 */
export type RoleHasPermissionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermissions
     */
    select?: Prisma.RoleHasPermissionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RoleHasPermissions
     */
    omit?: Prisma.RoleHasPermissionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RoleHasPermissionsInclude<ExtArgs> | null;
};
//# sourceMappingURL=RoleHasPermissions.d.ts.map