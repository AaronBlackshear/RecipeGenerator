import { Button } from '@components/Button'
import { ImageOrPlaceholder } from '@components/ImageOrPlaceholder'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import React from 'react'
import { useFormState, useFormStateDispatch } from '@components/RecipeForm/FormSteps/FormContext';
import { Input, Label } from '@components/Form';

type Props = {};

export function TitleStep({ }: Props) {
  const { title, image } = useFormState();
  const dispatch = useFormStateDispatch()

  return (
    <div className="flex flex-col space-y-5">
      <ImageUploading
        value={image ? [image] : []}
        onChange={onImageChange}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          dragProps,
        }) => (
          <section className="flex justify-start items-end space-x-4">
            <ImageOrPlaceholder src={imageList[0]?.data_url || ''} alt="" />
            <Button variant="primary" onClick={onImageUpload} {...dragProps}>Upload Image</Button>
            {image && <Button variant="redPrimary" onClick={() => onImageRemove(0)} {...dragProps}>Remove Image</Button>}
          </section>
        )}
      </ImageUploading>

      <div>
        <Input label={<Label>Title</Label>} maxLength={50} value={title} onChange={(e) => dispatch({ type: 'update', payload: { title: e.target.value } })} />
      </div>
    </div>
  )

  function onImageChange(imageList: ImageListType) {
    dispatch({ type: 'update', payload: { image: imageList[0] } })
  }
}
