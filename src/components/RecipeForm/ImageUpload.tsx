import { Icon } from '@components/Icons';
import { ImageOrPlaceholder } from '@components/ImageOrPlaceholder';
import { FormInputs } from '@page_impls/RecipeFormPage';
import classNames from 'classnames';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import ImageUploading, { ImageListType } from 'react-images-uploading';

type Props = {
  form: UseFormReturn<FormInputs>;
}

export function ImageUpload({ form }: Props) {
  const { image } = form.watch();

  return (
    <div className="flex flex-col">
      <ImageUploading
        value={[]}
        onChange={onImageChange}
        dataURLKey="data_url"
      >
        {({
          onImageUpload,
        }) => (
          <section className="flex justify-start items-end space-x-4">
            <div className="relative overflow-hidden rounded">
              <div className="w-32 h-32">
                <ImageOrPlaceholder src={image || ''} alt="" />
              </div>
              <ImageUploadOverlay imageUploaded={!!image} onUpload={onImageUpload} onRemove={onImageRemove} />
            </div>
          </section>
        )}
      </ImageUploading>
    </div>
  )

  function onImageChange(imageList: ImageListType) {
    form.setValue("image", imageList[0].data_url)
    form.trigger('image')
  }

  function onImageRemove() {
    form.setValue("image", "")
  }
}

type ImageUploadOverlayProps = {
  onUpload: () => void;
  onRemove: () => void;
  imageUploaded: boolean;
}

function ImageUploadOverlay({ imageUploaded, onUpload, onRemove }: ImageUploadOverlayProps) {
  return (
    <button
      className={classNames(
        "w-full h-full absolute top-0 left-0 flex justify-center items-center text-gray-12 opacity-0 hover:opacity-100 hover:bg-gray-4 hover:bg-opacity-70 hover:scale-125 transition-all",
        imageUploaded ? "" : ""
      )}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        imageUploaded ? onRemove() : onUpload()
      }}
    >
      <div className="bg-gray-2 bg-opacity-60 rounded-full">
        <Icon type={imageUploaded ? "xMarkOutline" : "arrowUpTrayOutline"} size="lg" />
      </div>
    </button>
  )
}
