import { NewStaff } from "@/api/staff/addNewStaff";
import { emailRegex } from "@/utils/regex";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import DropZone from "../DropZone/DropZone";
import { useUpdateStaffModal } from "./UpdateStaffFormModal";
import Staff from "@/types/entity/Staff";

export default function UpdateStaffFormUI({
    onSubmitData,
    className,
    staff,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
    } = useForm<NewStaff>({
        defaultValues: {
            ...staff,
        },
    });

    const { closeUpdateStaffModal } = useUpdateStaffModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Update staff profile
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" flex flex-col gap-5 mt-5">
                    <div className=" pl-4 flex flex-row items-start gap-12">
                        <div className=" pt-6 w-32 scale-125">
                            <DropZone isCompact />
                        </div>
                        <div className=" flex-1">
                            <ControllerTextInput
                                control={control}
                                name="name"
                                title="Name"
                                rules={{ required: "Name is required" }}
                                register={register}
                                placeholder="Staff fullname"
                                onValueChange={(d: any) => {
                                    clearErrors("name");
                                }}
                                error={errors.name}
                            />
                            <ControllerSelectInput
                                control={control}
                                name="role"
                                title="Role"
                                defaultValue={staff?.role}
                                items={[
                                    { name: "Admin", id: "ADMIN" },
                                    { name: "Staff", id: "STAFF" },
                                ]}
                                choseValue={getValues("role")}
                                onValueChange={(value) =>
                                    setValue("role", value)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <ControllerTextInput
                            control={control}
                            name="phone"
                            title="Phone"
                            placeholder="0912345678"
                            rules={{
                                required: "Phone number is required",
                                validate: (value: string) => {
                                    if (value[0] !== "0")
                                        return "Phone number must start with 0";
                                    if (value.length !== 10)
                                        return "Phone number length must be 10";
                                },
                            }}
                            register={register}
                            onValueChange={(d: number) => {
                                clearErrors("phone");
                            }}
                            error={errors.phone}
                        />
                        <ControllerTextInput
                            control={control}
                            name="email"
                            title="Email"
                            placeholder="example.esms@gmail.com"
                            rules={{
                                required: "Email is required",
                                validate: (value: string) =>
                                    !emailRegex.test(value)
                                        ? "Invalid email"
                                        : undefined,
                            }}
                            register={register}
                            onValueChange={(d: any) => {
                                clearErrors("email");
                            }}
                            error={errors.email}
                        />
                        <ControllerTextInput
                            control={control}
                            name="citizenId"
                            title="Citizen ID"
                            rules={{
                                required: "Citizen ID is required",
                                validate: (value: string) =>
                                    value.length !== 9 && value.length !== 12
                                        ? "Citizen ID must be 9 or 12 long"
                                        : undefined,
                            }}
                            register={register}
                            placeholder="CCCD or CMND"
                            onValueChange={(d: any) => {
                                clearErrors("citizenId");
                            }}
                            error={errors.citizenId}
                        />
                    </div>
                </div>
                <div className=" flex justify-between mt-12">
                    <Button
                        btnType="secondary"
                        onClick={() => closeUpdateStaffModal()}
                    >
                        Back
                    </Button>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    onSubmitData: SubmitHandler<NewStaff>;
    staff?: Staff;
};
