<script lang="ts" setup>
    import { ref} from 'vue'
    //import { Blob } from 'buffer'

    /*let imageUrl = ref('');

    function setImage(url) {
        imageUrl.value = url;
    }*/

    /*const uploadImage = () => {
        const file: HTMLInputElement = document.getElementById("fileUpload") as HTMLInputElement;
        //const file = imagesUpload?.current?.files?.[0];
        const blob = new Blob(file, { type: "image/png" });
        //const [imageUrl, setImage] = useState<string | ArrayBuffer | null>(null);
        let formData = new FormData();

        formData.append("file", blob);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_USER_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //setImage(data.secure_url);
        })
        .catch(error => {
            console.log(error);
        });
    }*/

    //const imagesUpload = ref(null);
    let imageUrl = ref('');

    const uploadImage = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        let formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_USER_NAME}/image/upload`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            imageUrl.value = (data.secure_url);

        })
        .catch(error => {
            console.log(error);
        });
    }

</script>

<template>
    <div>
        <label for="fileUpload">Upload image</label>
        <input @change="uploadImage" type="file" id="fileUpload" name="fileUpload">
    </div>
    <a>submit</a>
</template>

<style scoped>
</style>