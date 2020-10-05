# Caesar cipher cli

This is command-line application to encode/decode text with Caesar's cipher. It works only with Latin alphabet letters.

## Initial Setup

- Download it from this repository
- Run the command line
- Go to the `caesar-cipher` folder
- Run `npm i` to install packages

## How to use

Enter the following in the command line:

```
node index [options]
```

The list of allowed options:

- -s, --shift: a shift (required)
- -i, --input: an input file (if omitted text is inputed from cli)
- -o, --output: an output file (if omitted text is outputed to cli)
- -a, --action: an action encode/decode (required)

## Examples of usage

```
node index -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```
node index --action encode --shift 7 --input plain.txt --output encoded.txt
```

```
node index --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt This is secret. Message about "\_" symbol!

> output.txt Aopz pz zljyla. Tlzzhnl hivba "\_" zftivs!
