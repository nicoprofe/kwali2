// FUNCTION TO UPLOAD IMAGE AND UPDATE ORDER'S PREVIEW
async function updateOrderPreview(orderId, imageFile) {
    try {
        // Upload image to storage
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${imageFile.name}-${uuidv4()}`
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        // Wait for the upload to complete
        const snapshot = await uploadTask

        // Get the download URL
        const downloadUrl = await getDownloadURL(snapshot.ref)

        // Update the 'preview' field in the specified order document
        const orderRef = doc(db, 'orders', orderId)
        await updateDoc(orderRef, {
            preview: downloadUrl
        })

        console.log('Image uploaded and order preview updated successfully')
    } catch (error) {
        console.error('Error uploading image', error)
    }
}



