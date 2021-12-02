use std::fs;

fn main() {
    // Read the input file into memory
    let filename = "input.txt";
    let contents = fs::read_to_string(filename)
        .expect("Unabled to read input file");

    // Split inputs into vector
    let inputs = contents
        .lines()
        .map(|x| x.parse::<i32>().expect("Unable to parse String to i32"))
        .collect::<Vec<i32>>();

    // Move in a sliding window and add groups of 3
    let mut sums: Vec<i32> = Vec::new();
    let upper_bound = inputs.len() - 2;
    for i in 0..upper_bound {
        let sum = inputs[i] + inputs[i + 1] + inputs[i + 2];
        sums.push(sum);
    }

    // Loop over sums and count the nubmer of size increases
    let mut increases = 0;
    let mut previous_sum = 0;
    for current_sum in sums {
        if previous_sum > 0 {
            // Increment if current input is larger than previous_sum
            if current_sum > previous_sum {
                increases = increases + 1;
            }
        }

        previous_sum = current_sum;
    }

    println!("Total increase: {}", increases);
}
