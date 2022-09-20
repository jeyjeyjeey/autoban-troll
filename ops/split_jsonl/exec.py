import pathlib
from argparse import ArgumentParser

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("input_jsonl_path")
    parser.add_argument("number_of_lines", type=int, default=100)
    args = parser.parse_args()

    with open(args.input_jsonl_path, "r") as f:
        f_stem = pathlib.Path(f.name).stem
        i = 0
        while True:
            i += 1
            try:
                with open(f"./output/{f_stem}_{i:03}.jsonl", "w") as wf:
                    for _ in range(args.number_of_lines):
                        wf.write(next(f))
            except StopIteration:
                break
