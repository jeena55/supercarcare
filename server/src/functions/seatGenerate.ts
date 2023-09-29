type seatType = {
    theatreId?: number
    seatType: string
    number: string
    price: number
}

const seatGenerate = (theatreId: number | null, amount: number): seatType[] => {

    const seatsList: seatType[] = []
    const steps = [{
        seat: "A",
        type: "HONEYMOON",
        price: 400
    }, {
        seat: "B",
        type: "FIRSTCLASS",
        price: 200
    }, {
        seat: "C",
        type: "NORMAL",
        price: 100
    }, {
        seat: "D",
        type: "NORMAL",
        price: 100
    }, {
        seat: "E",
        type: "NORMAL",
        price: 100
    }, {
        seat: "F",
        type: "NORMAL",
        price: 100
    }, {
        seat: "G",
        type: "NORMAL",
        price: 100
    }, {
        seat: "H",
        type: "NORMAL",
        price: 100
    }, {
        seat: "I",
        type: "NORMAL",
        price: 100
    }, {
        seat: "J",
        type: "NORMAL",
        price: 100
    }, {
        seat: "K",
        type: "NORMAL",
        price: 100
    }, {
        seat: "L",
        type: "NORMAL",
        price: 100
    }, {
        seat: "M",
        type: "NORMAL",
        price: 100
    }, {
        seat: "N",
        type: "NORMAL",
        price: 100
    }, {
        seat: "O",
        type: "NORMAL",
        price: 100
    }, {
        seat: "P",
        type: "NORMAL",
        price: 100
    }, {
        seat: "Q",
        type: "NORMAL",
        price: 100
    }, {
        seat: "R",
        type: "NORMAL",
        price: 100
    }]

    let currentStep = 0;

    for (let i = 1; i <= amount; i++) {

        // ถ้าเกิดว่ามันเกิด steps ที่เป็นไปได้ทั้งหมด
        if (currentStep == steps.length) {
            break;
        }

        seatsList.push({
            seatType: steps[currentStep].type,
            number: steps[currentStep].seat + (i % 20),
            price: steps[currentStep].price,
            ...(theatreId && { theatreId: theatreId })
        })

        if (i % 20 == 0) {
            currentStep += 1;
        }
    }

    return seatsList
}

export default seatGenerate