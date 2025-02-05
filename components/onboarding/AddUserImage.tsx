import Image from 'next/image';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '../ui/dialog';
import { Check, TrashIcon, User } from 'lucide-react';
import React, { useMemo, useRef, useState } from 'react';
import { UserAvatar } from '../ui/user-avatar';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { imageSchema, ImageSchema } from '@/schema/imageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';

interface Props {
    profileImage?: string | null;
    fullname?: string | null;
}
export const AddUserImage = ({ profileImage, fullname }: Props) => {
    const [imagePrev, setImagePreview] = useState('');
    const inputRef = useRef<null | HTMLInputElement>(null);
    const form = useForm<ImageSchema>({
        resolver: zodResolver(imageSchema),
    });

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const result = imageSchema.safeParse({ image: selectedFile });

            if (result.success) {
                form.clearErrors('image');
                form.setValue('image', selectedFile);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
            } else {
                // any error
                const errors = result.error.flatten().fieldErrors.image;
                errors?.forEach((error) => form.setError('image', { message: error }));
            }
        }
    };
    const imnageOptions = useMemo(() => {
        if (!imagePrev && profileImage) {
            return {
                canDelete: true,
                canSave: false,
            };
        } else if (imagePrev && profileImage) {
            return {
                canDelete: false,
                canSave: true,
            };
        } else if (imagePrev && !profileImage) {
            return {
                canDelete: false,
                canSave: true,
            };
        } else {
            return {
                canDelete: false,
                canSave: false,
            };
        }
    }, [imagePrev, profileImage]);
    return (
        <div className="w-full flex flex-col justify-center items-center gap-2 ">
            <p className="text-sm text-muted-foreground">add an Image</p>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="relative bg-muted w-16 h-16 md:h-20 md:w-20 rounded-full flex justify-center  items-center text-muted-foreground overflow-hidden ">
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt={fullname || 'User Image'}
                                fill
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <User />
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center justify-center sm:max-w-[28rem] p-0">
                    <DialogTitle>User Avatar</DialogTitle>
                    <DialogHeader>Upload An Image</DialogHeader>
                    {imagePrev ? (
                        <div className="rounded-full w-20 h-20 relative overflow-hidden my-5">
                            <Image
                                src={imagePrev}
                                alt="user profile picture"
                                fill
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ) : (
                        <UserAvatar
                            className="w-52 h-52 my-5"
                            size={52}
                            profileImage={profileImage}
                        />
                    )}
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <Button
                                                    onClick={() => {
                                                        inputRef.current?.click();
                                                    }}
                                                    type="button"
                                                    className="dark:text-white mb-1"
                                                >
                                                    Chhose File
                                                </Button>
                                                <Input
                                                    {...field}
                                                    ref={inputRef}
                                                    value={undefined}
                                                    type="file"
                                                    id="image"
                                                    className="hidden"
                                                    onChange={onImageChange}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="flex mt-5 justify-center items-center w-full gap-4">
                                <Button
                                    type="button"
                                    disabled={!imnageOptions.canDelete}
                                    variant={imnageOptions.canDelete ? 'default' : 'secondary'}
                                    className={`rounded-full  w-12 h-12 p-2 ${imnageOptions.canDelete
                                        ? 'text-white'
                                        : 'text-muted-foreground'
                                        }`}
                                >
                                    <TrashIcon size={18} />
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!imnageOptions.canSave}
                                    variant={imnageOptions.canSave ? 'default' : 'secondary'}
                                    className={`rounded-full  w-12 h-12 p-2 ${imnageOptions.canSave
                                        ? 'text-white'
                                        : 'text-muted-foreground'
                                        }`}
                                >
                                    <Check size={18} />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
