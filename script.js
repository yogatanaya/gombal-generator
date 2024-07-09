const API_TOKEN = 'patbibsDayFHeX7pL.08243ac995b57df1e2a63c50515853aef291996bfd25b01a3966eaacdc4b6785';
const BASE_ID = 'apprj5UrxSSUW4c0h';
const tableName = "pickupline_table";

$(() => {

    $('.btnToCopy').on('click', function(e) {
        e.preventDefault();

        var content = $('.pickupline').text();

        var tempArea = document.createElement("textarea");
        tempArea.value = content;
        document.body.appendChild(tempArea);

        tempArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempArea);

        Swal.fire({
            text: 'Copied to clipboard',
            confirmButtonColor: '#f391b8'
        });
    })

    $('.btnGenerate').on('click', function(e) {
        e.preventDefault();

        Swal.fire({
            text: 'Tunggu Ya',
            allowOutsideClick: false, 
            didOpen: () => {
                Swal.showLoading();
            }
        })

        fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableName}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        }).then(response => {
            if (!response.ok) {
                Swal.close();

                throw new Error('Network response was not ok!')
            }

            return response.json();
        }).then(response => {

            Swal.close();
            
            var records = response.records;

            if (records.length > 0) {
                const randomIdx = Math.floor(Math.random() * records.length);
                const content = records[randomIdx].fields.content;

                $('.pickupline').text(content);

            } else {

                $('.pickupline').text('Coba lagi ya..')
            }

        }).catch(error => {

            Swal.close();
            
            console.log(error);
            $('.pickupline').text('Yahh.. kayanya lagi gangguan maaf ya :(');
        })
    })
    
});
